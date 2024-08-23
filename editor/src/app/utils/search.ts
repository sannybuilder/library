import Fuse, { FuseResult, IFuseOptions } from 'fuse.js';
import {
  get,
  set,
  omit,
  cloneDeep,
  flatMap,
  sortBy,
  uniqWith,
  isEqual,
} from 'lodash';
import { Command } from '../models';
import { commandParams, isOpcode, normalizeId } from './command';

export const FUSEJS_OPTIONS: IFuseOptions<Command> & {
  fusejsHighlightKey: string;
} = {
  keys: [
    { name: 'name', weight: 50.0 },
    { name: 'member', weight: 2.5 },
    { name: 'class', weight: 2.0 },
    { name: 'short_desc', weight: 1.5 },
    { name: 'id', weight: 0.5 },
  ],
  shouldSort: false,
  threshold: 0.3,
  location: 0,
  distance: 500,
  ignoreLocation: false,
  minMatchCharLength: 3,
  fusejsHighlightKey: '_highlight',
  includeScore: true,
  includeMatches: true,
  useExtendedSearch: true,
};

const OPCODE_WORDS = ['beef', 'cafe', 'dead', 'deaf', 'face', 'fade', 'feed'];

type QueryFilter = (c: Command, query: string) => boolean;

const match = (a: string, b?: string) =>
  !a || b?.toLowerCase() === a.toLowerCase();

const includes = (a: string, b?: string) =>
  !a || b?.toLowerCase().includes(a.toLowerCase());

export const ConstructorHandler: QueryFilter = (c, q) => {
  return Boolean(
    c.attrs?.is_constructor && c.output?.some((o) => match(q, o.type))
  );
};

const DestructorHandler: QueryFilter = (c, q) => {
  return Boolean(c.attrs?.is_destructor && match(q, c.class));
};

const ConditionHandler: QueryFilter = (c, q) => {
  return Boolean(c.attrs?.is_condition && match(q, c.class));
};

const ParamNameHandler: QueryFilter = (c, q) => {
  return Boolean(commandParams(c).some((p) => match(q, p.name)));
};

const TypeHandler: QueryFilter = (c, q) => {
  return Boolean(commandParams(c).some((p) => match(q, p.type)));
};

const IdHandler: QueryFilter = (c, q) => {
  return Boolean(match(normalizeId(q), c.id));
};

const ContainsHandler: QueryFilter = (c, q) => {
  if (includes(q, c.class)) {
    return true;
  }
  if (includes(q, c.member)) {
    return true;
  }
  if (includes(q, c.short_desc)) {
    return true;
  }
  if (includes(q, c.name)) {
    return true;
  }
  if (includes(q, c.id)) {
    return true;
  }

  return false;
};

function getQueryHandlers() {
  const SpecialQueryHandlers: Record<string, QueryFilter> = {
    'constructor:': ConstructorHandler,
    'c:': ConstructorHandler,
    'destructor:': DestructorHandler,
    'd:': DestructorHandler,
    'condition:': ConditionHandler,
    'if:': ConditionHandler,
    'param:': ParamNameHandler,
    'p:': ParamNameHandler,
    'type:': TypeHandler,
    't:': TypeHandler,
    'id:': IdHandler,
    'contains:': ContainsHandler,
  };

  const entries = Object.entries(SpecialQueryHandlers);
  const inverted: Array<[string, QueryFilter]> = entries.map(([k, v]) => [
    '!' + k,
    (c, q) => !v(c, q),
  ]);

  return entries.concat(inverted);
}

export function abbrSearch(list: Command[], searchTerms: string) {
  let query = searchTerms.trim();

  if (!query || query.length < 2 || query.includes(':')) {
    return [];
  }

  // abbreviation search
  const candidates = list.filter((c) => {
    const parts = c.name.split('_');
    return (
      query.toLowerCase() ===
      parts
        .map((x) => x[0])
        .join('')
        .toLowerCase()
    );
  });

  return candidates;
}

export function search(list: Command[], searchTerms: string) {
  let query = searchTerms.trim();

  if (!query || query.length < 3) {
    return list;
  }

  let bucket: string[] = [];
  let inQuotes = false;
  let s = '';
  const sep = [' ', '.', ','];

  for (let c of [...query.split(''), ' ']) {
    if (c === '"') {
      if (inQuotes) {
        // close exact match sequence
        if (s.length) {
          bucket.push(`contains:${s}`);
          s = '';
        }
        inQuotes = false;
      } else {
        // open exact match sequence
        inQuotes = true;
      }
      continue;
    }

    if (inQuotes) {
      // build up exact match sequence
      s += c;
      continue;
    }

    if (sep.includes(c)) {
      // word separator
      if (s.length > 0) {
        if (s.length < 3) {
          // exact match for short words
          bucket.push(`contains:${s}`);
        } else {
          bucket.push(s);
        }
        s = '';
      }

      continue;
    }

    s += c;
  }
  const options = { ...FUSEJS_OPTIONS };

  if (
    bucket.every(isOpcode) &&
    !bucket.some((w) => OPCODE_WORDS.includes(w.toLowerCase()))
  ) {
    // multi opcode id search
    options.threshold = 0.0;
    return sortBy(
      flatMap(bucket, (opcode) => {
        const fuse = new Fuse(list, options);
        return handleHighlight(
          fuse.search(normalizeId(opcode)),
          options.fusejsHighlightKey,
          bucket
        );
      }),
      'id'
    );
  }

  const filters: Array<[QueryFilter, string]> = [];
  const handlers = getQueryHandlers();
  let fuzzyWords = [];

  for (const word of bucket) {
    const entry = handlers.find(([k, _]) => word.startsWith(k));

    if (entry) {
      const input = word.substring(entry[0].length).toLowerCase();
      filters.push([entry[1], input]);
    } else {
      fuzzyWords.push(word);
    }
  }

  const filtered = list.filter((c) => filters.every(([h, i]) => h(c, i)));

  if (!fuzzyWords.length) {
    return filtered;
  }

  const fuse = new Fuse(filtered, options);
  return handleHighlight(
    fuse.search(fuzzyWords.join(' ')),
    options.fusejsHighlightKey,
    fuzzyWords
  );
}

function handleHighlight(
  result: FuseResult<any>[],
  fusejsHighlightKey: string,
  words: string[]
) {
  const wordLookup = words.map((w) => w.toLowerCase());
  return result.map((matchObject) => {
    const item = cloneDeep(matchObject.item);
    item.score = matchObject.score;
    item[fusejsHighlightKey] = omit(item, fusejsHighlightKey);
    if (!matchObject.matches) {
      return item;
    }
    for (const match of matchObject.matches) {
      const indices: number[][] = uniqWith(match.indices, isEqual);

      let highlightOffset = 0;

      let key = match.key;
      if (!key) {
        continue;
      }

      for (const [intervalStart, intervalEnd] of mergeIntervals(indices)) {
        const initialValue = get(item[fusejsHighlightKey], key).toString();

        const startOffset = intervalStart + highlightOffset;
        const endOffset = intervalEnd + highlightOffset + 1;
        const highlightedTerm = initialValue.substring(startOffset, endOffset);

        // boost exact match
        const highlightedTermLookup = highlightedTerm.toLowerCase();
        if (wordLookup.includes(highlightedTermLookup)) {
          item.score *= 1e-2;
        }
        const newValue =
          initialValue.substring(0, startOffset) +
          '<em>' +
          highlightedTerm +
          '</em>' +
          initialValue.substring(endOffset);
        highlightOffset += '<em></em>'.length;
        set(item[fusejsHighlightKey], key, newValue);
      }
    }

    return item;
  });
}

function mergeIntervals(intervals: Array<number[]>) {
  const sorted = sortBy(intervals, (v) => v[0]);

  const merged = [sorted[0]];

  for (const [begin, end] of sorted) {
    const prevEnd = merged[merged.length - 1]![1];
    if (begin > prevEnd) {
      // no overlap
      merged.push([begin, end]);
    } else {
      if (end > prevEnd) {
        // partial overlap
        merged[merged.length - 1]![1] = end;
      } else {
        // full overlap
      }
    }
  }

  return merged;
}

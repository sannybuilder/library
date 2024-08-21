import Fuse from 'fuse.js';
import {
  get,
  set,
  omit,
  cloneDeep,
  split,
  flatMap,
  sortBy,
  uniqWith,
  isEqual,
} from 'lodash';
import { Command } from '../models';
import { commandParams, isOpcode, normalizeId } from './command';

export const FUSEJS_OPTIONS: Fuse.IFuseOptions<Command> & {
  fusejsHighlightKey: string;
} = {
  keys: [
    { name: 'name', weight: 50.0 },
    { name: 'member', weight: 2.5 },
    { name: 'class', weight: 2.0 },
    { name: 'short_desc', weight: 1.5 },
    { name: 'id', weight: 0.5 },
  ],
  includeMatches: true,
  shouldSort: false,
  threshold: 0.3,
  location: 150,
  minMatchCharLength: 2,
  fusejsHighlightKey: '_highlight',
  includeScore: true,
  useExtendedSearch: true,
};

type QueryFilter = (c: Command, query: string) => boolean;

const match = (a: string, b?: string) =>
  !a || b?.toLowerCase() === a.toLowerCase();

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

  if (!query || (query.length < 3 && !query.includes(':'))) {
    return list;
  }

  const options = { ...FUSEJS_OPTIONS };
  const words = query.split(/\s+|,\s*|\./);
  const wordsFiltered = words.filter((x) => x.toLowerCase() !== 'fade');
  const doesContainOnlyOpcodes =
    wordsFiltered.length > 0 && wordsFiltered.every(isOpcode);

  if (doesContainOnlyOpcodes) {
    // multi opcode id search
    options.threshold = 0.0;
    return sortBy(
      flatMap(words, (opcode) => {
        const fuse = new Fuse(list, options);
        return handleHighlight(
          fuse.search(normalizeId(opcode)),
          options.fusejsHighlightKey,
          words
        );
      }),
      'id'
    );
  }

  let filtered = list;

  if (query.startsWith('"') && query.endsWith('"')) {
    // exact search
    options.threshold = 0.0;
    query = query.substring(1, query.length - 1);
  } else if (searchTerms.includes(':')) {
    // special search queries
    query = '';
    const filters: Array<[QueryFilter, string]> = [];
    const entries = getQueryHandlers();

    for (const word of split(searchTerms, ' ').filter(
      (w) => w.trim().length > 0
    )) {
      const entry = entries.find(([k, _]) => word.startsWith(k));

      if (entry) {
        const input = word.substring(entry[0].length).toLowerCase();
        filters.push([entry[1], input]);
      } else {
        query = query + ' ' + word;
      }
    }

    filtered = list.filter((c) => filters.every(([h, i]) => h(c, i)));

    if (!query) {
      return filtered;
    }
  }

  const fuse = new Fuse(filtered, options);
  return handleHighlight(fuse.search(query), options.fusejsHighlightKey, words);
}

function handleHighlight(
  result: any[],
  fusejsHighlightKey: string,
  words: string[]
) {
  const wordLookup = words.map((w) => w.toLowerCase());
  return result.map((matchObject) => {
    const item = cloneDeep(matchObject.item);
    item.score = matchObject.score;
    item[fusejsHighlightKey] = omit(item, fusejsHighlightKey);
    for (const match of matchObject.matches) {
      const indices: number[][] = uniqWith(match.indices, isEqual);

      let highlightOffset = 0;

      let key: string = match.key;
      if (get(item[fusejsHighlightKey], key).constructor === Array) {
        key += `[${match.arrayIndex}]`;
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
  const sorted = sortBy(intervals, (v) => v[0]).filter(
    ([begin, end]) => end - begin >= 2
  );

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

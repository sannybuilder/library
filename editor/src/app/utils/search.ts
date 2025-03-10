import { get, set, omit, cloneDeep, sortBy, uniqWith, isEqual } from 'lodash';
import { Command, Game } from '../models';
import { commandParams, isOpcode, normalizeId } from './command';

type RangeTuple = [number, number]

type SearchResultMatch = {
  indices: ReadonlyArray<RangeTuple>
  key?: string
  refIndex?: number
  value?: string
}

type SearchResult<T> = {
  item: T
  refIndex: number
  score?: number
  matches?: ReadonlyArray<SearchResultMatch>
}

export const SEARCH_OPTIONS = {
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
  highlightKey: '_highlight',
  includeScore: true,
  includeMatches: true,
  useExtendedSearch: true,
} as const;

const OPCODE_WORDS = ['beef', 'cafe', 'dead', 'deaf', 'face', 'fade', 'feed'];

type QueryFilter = (c: Command, query: string) => boolean;

const match = (a: string, b?: string) =>
  !a || b?.toLowerCase() === a.toLowerCase();

const includes = (a: string, b?: string) =>
  !a || b?.toLowerCase().includes(a.toLowerCase());

const starts = (a: string, b?: string) =>
  !a || b?.toLowerCase().startsWith(a.toLowerCase());

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
    'class:': (c, q) => Boolean(match(q, c.class)),
    'member:': (c, q) => Boolean(starts(q, c.member)),
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

  if (!query || query.length < 3 || query.includes(':')) {
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

function parseQuery(searchTerms: string) {
  let query = searchTerms.trim();

  let bucket: string[] = [];
  let inQuotes = false;
  let s = '';
  let prevSep = '';
  const sep = [' ', '.', ',', '(', ')', '[', ']', '::'];

  const chars = [...query.split(''), ' '];
  for (let i = 0; i < chars.length; i += 1) {
    let c = chars[i];
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

    if (c === ':' && chars[i + 1] === ':') {
      //:: is a single token in native class::method
      c = '::';
      i += 1;
    }

    if (sep.includes(c)) {
      // word separator
      if (s.length > 0) {
        // ignore content in braces
        if (prevSep === ')') {
          prevSep = c;
          continue;
        }
        if (prevSep === '(') {
          continue;
        }
        if (c === '.') {
          bucket.push(`class:${s}`);
        } else if (prevSep === '.') {
          bucket.push(`member:${s}`);
        } else if (isOpcode(s) && !OPCODE_WORDS.includes(s)) {
          bucket.push(`id:${s}`);
        } else {
          if (s.includes(':')) {
            bucket.push(s);
          } else {
            bucket.push(`contains:${s}`);
          }
        }
        s = '';
      }

      prevSep = c;
      continue;
    }

    s += c;
  }

  const filters: Array<[QueryFilter, string]> = [];
  const handlers = getQueryHandlers();

  for (const word of bucket) {
    const entry = handlers.find(([k, _]) => word.startsWith(k));

    if (entry) {
      const input = word.substring(entry[0].length).toLowerCase();
      filters.push([entry[1], input]);
    } else {
      filters.push([ContainsHandler, word]);
    }
  }
  return filters;
}

function scoreResult(command: Command, filters: [QueryFilter, string][]) {
  const matches: SearchResultMatch[] = [];
  let score = 0;

  SEARCH_OPTIONS.keys.forEach(
    ({ name, weight = 1 }) => {
      const prop = get(command, name);
      if (!prop) {
        return;
      }

      const indices: RangeTuple[] = [];
      const lowerProp = prop.toLowerCase();
      let usePct = 0;

      for (const [handler, word] of filters) {
        let index = lowerProp.indexOf(word.toLowerCase());

        if (index === -1) {
          // don't reorder results based on custom filters
          if (handler !== ContainsHandler) {
            // demote partial results
            score += weight;
          }

          continue;
        }
        while (index !== -1) {
          // don't reorder results based on custom filters
          if (handler !== ContainsHandler) {
            score -= weight / (index + 1); // lower's better
          }
          indices.push([index, index + word.length - 1]);
          index = lowerProp.indexOf(word.toLowerCase(), index + 1);
        }

        // more consumed's better
        usePct += word.length / prop.length;
      }

      score -= weight * usePct;

      if (indices.length) {
        matches.push({ indices, key: name as string, value: prop });
      }
    }
  );

  return { item: command, score, matches, refIndex: 0 };
}

export function exactSearch(list: Command[], searchTerms: string) {
  const filters = parseQuery(searchTerms);
  const options = { ...SEARCH_OPTIONS };

  // try to find exact match for all words
  const result = list.filter((c) => filters.every(([h, i]) => h(c, i)));
  const scored = result.map((command) => scoreResult(command, filters));

  return handleHighlight(scored, options.highlightKey);
}

export function partialSearch(list: Command[], searchTerms: string) {
  const filters = parseQuery(searchTerms);
  const options = { ...SEARCH_OPTIONS };

  // try to find exact match for some words
  const result = list.filter((c) =>
    filters
      .filter(([h, i]) => h === ContainsHandler && i.length > 2)
      .some(([h, i]) => h(c, i))
  );

  const scored = result.map((command) => scoreResult(command, filters));

  return handleHighlight(scored, options.highlightKey);
}


function handleHighlight(
  result: SearchResult<any>[],
  highlightKey: string
) {
  return result.map((matchObject) => {
    const item = cloneDeep(matchObject.item);
    item.score = matchObject.score;
    item[highlightKey] = omit(item, highlightKey);
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
        const initialValue = get(item[highlightKey], key).toString();

        const startOffset = intervalStart + highlightOffset;
        const endOffset = intervalEnd + highlightOffset + 1;
        const highlightedTerm = initialValue.substring(startOffset, endOffset);
        const newValue =
          initialValue.substring(0, startOffset) +
          '<em>' +
          highlightedTerm +
          '</em>' +
          initialValue.substring(endOffset);
        highlightOffset += '<em></em>'.length;
        set(item[highlightKey], key, newValue);
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

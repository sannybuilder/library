import Fuse from 'fuse.js';
import { get, set, omit, cloneDeep, split } from 'lodash';
import { Command } from '../models';
import { commandParams, normalizeId } from './command';

export const FUSEJS_OPTIONS = {
  keys: ['name', 'short_desc', 'id', 'class', 'member'],
  includeMatches: true,
  shouldSort: true,
  threshold: 0.3,
  ignoreLocation: true,
  minMatchCharLength: 3,
  fusejsHighlightKey: '_highlight',
};

type QueryFilter = (c: Command, query: string) => boolean;

const match = (a: string, b?: string) => !a || b?.toLowerCase() === a;

const ConstructorHandler: QueryFilter = (c, q) => {
  return Boolean(c.attrs?.is_constructor && match(q, c.output?.[0]?.type));
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

export function search(list: Command[], searchTerms: string) {
  let query = searchTerms.trim();

  if (!query || (query.length < 3 && !query.includes(':'))) {
    return list;
  }

  const options = { ...FUSEJS_OPTIONS };

  if (query.length === 4 && (query[0] === '0' || query[0] === '8')) {
    // opcode id search
    query = normalizeId(query);
    options.threshold = 0.0;
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
  return handleHighlight(fuse.search(query), options.fusejsHighlightKey);
}

function handleHighlight(result: any[], fusejsHighlightKey: string) {
  return result.map((matchObject) => {
    const item = cloneDeep(matchObject.item);
    item[fusejsHighlightKey] = omit(item, fusejsHighlightKey);
    for (const match of matchObject.matches) {
      const indices: number[][] = match.indices;

      let highlightOffset = 0;

      let key: string = match.key;
      if (get(item[fusejsHighlightKey], key).constructor === Array) {
        key += `[${match.arrayIndex}]`;
      }

      for (const indice of indices) {
        const initialValue = get(item[fusejsHighlightKey], key).toString();

        const startOffset = indice[0] + highlightOffset;
        const endOffset = indice[1] + highlightOffset + 1;
        const highlightedTerm = initialValue.substring(startOffset, endOffset);
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

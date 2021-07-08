import Fuse from 'fuse.js';
import { get, set, omit, cloneDeep } from 'lodash';
import { Command } from '../models';

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

const ConstructorHandler: QueryFilter = (c, q) => {
  return Boolean(
    c.attrs?.is_constructor && c.output?.[0]?.type?.toLowerCase() === q
  );
};

const DestructorHandler: QueryFilter = (c, q) => {
  return Boolean(c.attrs?.is_destructor && c.class?.toLowerCase() === q);
};

const ConditionHandler: QueryFilter = (c, q) => {
  return Boolean(c.attrs?.is_condition && c.class?.toLowerCase() === q);
};

const SpecialQueryHandlers: Record<string, QueryFilter> = {
  'constructor:': ConstructorHandler,
  'c:': ConstructorHandler,
  'destructor:': DestructorHandler,
  'd:': DestructorHandler,
  'condition:': ConditionHandler,
  'if:': ConditionHandler,
};

export function search(list: Command[], searchTerms: string) {
  if (!searchTerms || searchTerms.length < 3) {
    return list;
  }

  // hack for opcode search
  const options =
    searchTerms.length === 4 && searchTerms[0] === '0'
      ? { ...FUSEJS_OPTIONS, threshold: 0.0 }
      : FUSEJS_OPTIONS;

  // search queries
  if (searchTerms.includes(':')) {
    for (const [k, v] of Object.entries(SpecialQueryHandlers)) {
      if (searchTerms.startsWith(k)) {
        const query = searchTerms.substring(k.length).toLowerCase();
        return list.filter((c) => v(c, query));
      }
    }
  }

  const fuse = new Fuse(list, options);
  return handleHighlight(fuse.search(searchTerms), options.fusejsHighlightKey);
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

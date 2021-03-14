import { Action, createReducer, on } from '@ngrx/store';
import { ExtensionSnippetsViewModel } from '../../models';
import { loadSnippetsSuccess } from './actions';

export interface SnippetsState {
  extensionSnippets?: ExtensionSnippetsViewModel;
}

export const initialState: SnippetsState = {};

const _reducer = createReducer(
  initialState,
  on(loadSnippetsSuccess, (state, { extensionSnippets }) => {
    // add changed: false to each snippet
    const snippets = Object.entries(extensionSnippets).reduce(
      (extensionMap, [extensionName, map]) => {
        extensionMap[extensionName] = Object.entries(map).reduce(
          (snippetMap, [opcode, snippet]) => {
            snippetMap[opcode] = { snippet, changed: false };
            return snippetMap;
          },
          {}
        );
        return extensionMap;
      },
      {}
    );
    return {
      ...state,
      extensionSnippets: snippets,
    };
  })
);

export function snippetsReducer(state: SnippetsState, action: Action) {
  return _reducer(state, action);
}

import { Action, createReducer, on } from '@ngrx/store';
import { ExtensionSnippets } from '../../models';
import { loadSnippetsSuccess, updateSnippet } from './actions';

export interface SnippetsState {
  extensionSnippets?: ExtensionSnippets;
}

export const initialState: SnippetsState = {};

const _reducer = createReducer(
  initialState,
  on(loadSnippetsSuccess, (state, { extensionSnippets }) => ({
    ...state,
    extensionSnippets,
  })),
  on(updateSnippet, (state, { extension, opcode, content }) => ({
    ...state,
    extensionSnippets: {
      ...state.extensionSnippets,
      [extension]: {
        ...state.extensionSnippets[extension],
        [opcode]: content,
      },
    },
  }))
);

export function snippetsReducer(state: SnippetsState, action: Action) {
  return _reducer(state, action);
}

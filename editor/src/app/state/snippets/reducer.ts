import { Action, createReducer, on } from '@ngrx/store';
import { ExtensionSnippets, Game } from '../../models';
import { loadSnippetsSuccess, updateGameSnippet } from './actions';

export interface SnippetsState {
  extensionSnippets: Partial<Record<Game, ExtensionSnippets>>;
}

export const initialState: SnippetsState = {
  extensionSnippets: {},
};

const _reducer = createReducer(
  initialState,
  on(loadSnippetsSuccess, (state, { game, extensionSnippets }) => ({
    ...state,
    extensionSnippets: {
      ...state.extensionSnippets,
      [game]: extensionSnippets,
    },
  })),
  on(updateGameSnippet, (state, { game, extension, opcode, content }) => ({
    ...state,
    extensionSnippets: {
      ...state.extensionSnippets,
      [game]: {
        ...(state.extensionSnippets[game] ?? {}),
        [extension]: {
          ...(state.extensionSnippets[game]?.[extension] ?? {}),
          [opcode]: content,
        },
      },
    },
  }))
);

export function snippetsReducer(state: SnippetsState, action: Action) {
  return _reducer(state, action);
}

import { createReducer, on } from '@ngrx/store';
import { ExtensionSnippets, Game } from '../../models';
import { loadSnippetsSuccess, updateGameSnippet } from './actions';

export interface SnippetsState {
  extensionSnippets: Partial<Record<Game, ExtensionSnippets>>;
}

export const initialState: SnippetsState = {
  extensionSnippets: {},
};

export const snippetsReducer = createReducer(
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

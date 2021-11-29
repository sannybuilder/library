import { createReducer, on } from '@ngrx/store';
import { getGameVariations, smash } from '../../utils';
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
  on(loadSnippetsSuccess, (state, { game, extensionSnippets }) => {
    const games = [game, ...getGameVariations(game)];
    return games.reduce((m, v) => updateState(m, v, extensionSnippets), state);
  }),
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

function updateState(
  state: SnippetsState,
  game: Game,
  newState: Partial<SnippetsState>
) {
  return {
    ...state,
    extensionSnippets: {
      ...state.extensionSnippets,
      [game]: smash({ ...(state.extensionSnippets[game] ?? {}), ...newState }),
    },
  };
}

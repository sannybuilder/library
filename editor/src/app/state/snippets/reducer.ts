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
    const games = getGameVariations(game);
    return games.reduce((m, v) => updateState(m, v, extensionSnippets), state);
  }),
  on(
    updateGameSnippet,
    (state, { game, oldExtension, newExtension, id, content }) =>
      updateState(state, game, {
        // Remove old snippet
        [oldExtension]: {
          ...(state.extensionSnippets[game]?.[oldExtension] ?? {}),
          [id]: undefined,
        },
        // Add new snippet
        [newExtension]: {
          ...(state.extensionSnippets[game]?.[newExtension] ?? {}),
          [id]: content,
        },
      })
  )
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

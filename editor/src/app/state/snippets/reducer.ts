import { createReducer, on } from '@ngrx/store';
import { smash } from '../../utils';
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
  on(loadSnippetsSuccess, (state, { game, extensionSnippets }) =>
    updateState(state, game, extensionSnippets)
  ),
  on(updateGameSnippet, (state, { game, extension, opcode, content }) =>
    updateState(state, game, {
      [extension]: {
        ...(state.extensionSnippets[game]?.[extension] ?? {}),
        [opcode]: content,
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

import { createReducer, on } from '@ngrx/store';
import { KeyValueEntry, ScmMap, ScriptFile } from '../../components/scm/model';
import { Game } from '../../models';
import {
  loadRefsOverlaySuccess,
  loadScmFile,
  loadScmFileSuccess,
  loadScmMap,
  loadScmMapSuccess,
  loadVariableOverlaySuccess,
  selectScmLabelOffset,
  updateScmRefs,
  updateScmVariables,
} from './actions';
import { sortRefs, sortVariables } from '../../utils';

export interface ScmState {
  activeFileName?: string;
  activeGame?: Game;
  selectedLabelOffset?: number;
  files: Record<string, ScriptFile>;
  refsByGame: Partial<Record<Game, KeyValueEntry[]>>;
  variablesByGame: Partial<Record<Game, KeyValueEntry[]>>;
  maps: Partial<Record<Game, ScmMap>>;
}

export const initialState: ScmState = {
  files: {},
  refsByGame: {},
  variablesByGame: {},
  maps: {},
};

export const scmReducer = createReducer(
  initialState,
  on(loadScmFile, (state, { name }) => ({
    ...state,
    activeFileName: name,
  })),
  on(loadScmMap, (state, { game }) => ({
    ...state,
    activeGame: game,
  })),
  on(loadScmFileSuccess, (state, { name, content }) => ({
    ...state,
    activeFileName: name,
    files: {
      ...state.files,
      [name]: content,
    },
  })),
  on(loadVariableOverlaySuccess, (state, { game, variables }) =>
    updateState(state, game, {
      variablesByGame: {
        [game]: sortVariables(variables),
      },
    }),
  ),
  on(loadRefsOverlaySuccess, (state, { game, refs }) =>
    updateState(state, game, {
      refsByGame: {
        [game]: sortRefs(refs),
      },
    }),
  ),
  on(updateScmRefs, (state, { refs }) => {
    const game = state.activeGame;
    if (!game) {
      return state;
    }

    return updateState(state, game, {
      refsByGame: {
        [game]: refs,
      },
    });
  }),
  on(updateScmVariables, (state, { variables }) => {
    const game = state.activeGame;
    if (!game) {
      return state;
    }

    return updateState(state, game, {
      variablesByGame: {
        [game]: variables,
      },
    });
  }),
  on(loadScmMapSuccess, (state, { game, map }) => ({
    ...state,
    maps: {
      ...state.maps,
      [game]: map,
    },
  })),
  on(selectScmLabelOffset, (state, { offset }) => ({
    ...state,
    selectedLabelOffset: offset,
  })),
);

function updateState(
  state: ScmState,
  game: Game,
  update: Partial<ScmState>,
): ScmState {
  const refs = update.refsByGame?.[game] ?? state.refsByGame[game] ?? [];
  const variables =
    update.variablesByGame?.[game] ?? state.variablesByGame[game] ?? [];

  return {
    ...state,
    ...update,
    refsByGame: {
      ...state.refsByGame,
      ...update.refsByGame,
      [game]: refs,
    },
    variablesByGame: {
      ...state.variablesByGame,
      ...update.variablesByGame,
      [game]: variables,
    },
  };
}

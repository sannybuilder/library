import { createReducer, on } from '@ngrx/store';
import { ScmMap, ScriptFile } from '../../components/scm/model';
import { Game } from '../../models';
import {
  loadScmFile,
  loadScmFileSuccess,
  loadScmMap,
  loadScmMapSuccess,
  loadScmOverlaySuccess,
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
  overlayByGame: Partial<Record<Game, Record<string, string>>>;
  refsByGame: Partial<Record<Game, Record<string, string>>>;
  variablesByGame: Partial<Record<Game, Record<string, string>>>;
  maps: Partial<Record<Game, ScmMap>>;
}

export const initialState: ScmState = {
  files: {},
  overlayByGame: {},
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
  on(loadScmOverlaySuccess, (state, { game, refs, variables }) =>
    updateState(state, game, {
      refsByGame: {
        [game]: sortRefs(refs),
      },
      variablesByGame: {
        [game]: sortVariables(variables),
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
  const refs = update.refsByGame?.[game] ?? state.refsByGame[game] ?? {};
  const variables =
    update.variablesByGame?.[game] ?? state.variablesByGame[game] ?? {};

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
    overlayByGame: {
      ...state.overlayByGame,
      [game]: {
        ...refs,
        ...variables,
      },
    },
  };
}

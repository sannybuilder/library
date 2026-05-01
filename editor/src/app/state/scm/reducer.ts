import { createReducer, on } from '@ngrx/store';
import { KeyValueEntry, ScmMap, ScriptFile } from '../../components/scm/model';
import { Game } from '../../models';
import {
  loadCommentsOverlaySuccess,
  loadRefsOverlaySuccess,
  loadScmFile,
  loadScmFileSuccess,
  loadScmMap,
  loadScmMapSuccess,
  loadVariableOverlaySuccess,
  selectScmLabelOffset,
  updateScmComments,
  updateScmRefs,
  updateScmVariables,
} from './actions';
import { sortRefs, sortVariables } from '../../utils';

export interface ScmState {
  activeFileName?: string;
  activeGame?: Game;
  selectedLabelOffset?: number;
  files: Record<string, ScriptFile>;
  commentsByGame: Partial<Record<Game, KeyValueEntry[]>>;
  refsByGame: Partial<Record<Game, KeyValueEntry[]>>;
  variablesByGame: Partial<Record<Game, KeyValueEntry[]>>;
  maps: Partial<Record<Game, ScmMap>>;
}

export const initialState: ScmState = {
  files: {},
  commentsByGame: {},
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
  on(loadCommentsOverlaySuccess, (state, { game, comments }) =>
    updateState(state, game, {
      commentsByGame: {
        [game]: comments,
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
  on(updateScmComments, (state, { comments }) => {
    const game = state.activeGame;
    if (!game) {
      return state;
    }

    return updateState(state, game, {
      commentsByGame: {
        [game]: comments,
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
  const comments =
    update.commentsByGame?.[game] ?? state.commentsByGame[game] ?? [];
  const variables =
    update.variablesByGame?.[game] ?? state.variablesByGame[game] ?? [];

  return {
    ...state,
    ...update,
    commentsByGame: {
      ...state.commentsByGame,
      ...update.commentsByGame,
      [game]: comments,
    },
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

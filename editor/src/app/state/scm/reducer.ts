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
import { getScmScopeKey, sortRefs, sortVariables } from '../../utils';

export interface ScmState {
  activeFileName?: string;
  activeGame?: Game;
  activeVersion?: string;
  selectedLabelOffset?: number;
  files: Record<string, ScriptFile>;
  commentsByGame: Record<string, KeyValueEntry[]>;
  refsByGame: Record<string, KeyValueEntry[]>;
  variablesByGame: Record<string, KeyValueEntry[]>;
  maps: Record<string, ScmMap>;
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
  on(loadScmMap, (state, { game, version }) => ({
    ...state,
    activeGame: game,
    activeVersion: version,
  })),
  on(loadScmFileSuccess, (state, { name, content }) => ({
    ...state,
    activeFileName: name,
    files: {
      ...state.files,
      [fileCacheKey(state, name)]: content,
    },
  })),
  on(loadVariableOverlaySuccess, (state, { game, version, variables }) =>
    updateState(state, game, version, {
      variablesByGame: {
        [getScmScopeKey(game, version)]: sortVariables(variables),
      },
    }),
  ),
  on(loadRefsOverlaySuccess, (state, { game, version, refs }) =>
    updateState(state, game, version, {
      refsByGame: {
        [getScmScopeKey(game, version)]: sortRefs(refs),
      },
    }),
  ),
  on(loadCommentsOverlaySuccess, (state, { game, version, comments }) =>
    updateState(state, game, version, {
      commentsByGame: {
        [getScmScopeKey(game, version)]: comments,
      },
    }),
  ),
  on(updateScmRefs, (state, { refs }) => {
    const { activeGame: game, activeVersion: version } = state;
    if (!game) {
      return state;
    }

    return updateState(state, game, version, {
      refsByGame: {
        [getScmScopeKey(game, version)]: refs,
      },
    });
  }),
  on(updateScmVariables, (state, { variables }) => {
    const { activeGame: game, activeVersion: version } = state;
    if (!game) {
      return state;
    }

    return updateState(state, game, version, {
      variablesByGame: {
        [getScmScopeKey(game, version)]: variables,
      },
    });
  }),
  on(updateScmComments, (state, { comments }) => {
    const { activeGame: game, activeVersion: version } = state;
    if (!game) {
      return state;
    }

    return updateState(state, game, version, {
      commentsByGame: {
        [getScmScopeKey(game, version)]: comments,
      },
    });
  }),
  on(loadScmMapSuccess, (state, { game, version, map }) => ({
    ...state,
    maps: {
      ...state.maps,
      [getScmScopeKey(game, version)]: map,
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
  version: string | undefined,
  update: Partial<ScmState>,
): ScmState {
  const scope = getScmScopeKey(game, version);
  const refs = update.refsByGame?.[scope] ?? state.refsByGame[scope] ?? [];
  const comments =
    update.commentsByGame?.[scope] ?? state.commentsByGame[scope] ?? [];
  const variables =
    update.variablesByGame?.[scope] ?? state.variablesByGame[scope] ?? [];

  return {
    ...state,
    ...update,
    commentsByGame: {
      ...state.commentsByGame,
      ...update.commentsByGame,
      [scope]: comments,
    },
    refsByGame: {
      ...state.refsByGame,
      ...update.refsByGame,
      [scope]: refs,
    },
    variablesByGame: {
      ...state.variablesByGame,
      ...update.variablesByGame,
      [scope]: variables,
    },
  };
}

function fileCacheKey(state: ScmState, name: string): string {
  const scope = getScmScopeKey(
    state.activeGame ?? ('' as Game),
    state.activeVersion,
  );
  return `${scope}:${name}`;
}

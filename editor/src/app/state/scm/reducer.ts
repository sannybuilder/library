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
} from './actions';

export interface ScmState {
  activeFileName?: string;
  selectedLabelOffset?: number;
  files: Record<string, ScriptFile>;
  overlays: Partial<Record<Game, Record<string, string>>>;
  maps: Partial<Record<Game, ScmMap>>;
}

export const initialState: ScmState = {
  files: {},
  overlays: {},
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
  on(loadScmOverlaySuccess, (state, { game, overlay }) => ({
    ...state,
    overlays: {
      ...state.overlays,
      [game]: overlay,
    },
  })),
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
  }))
);

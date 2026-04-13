import { createAction, props } from '@ngrx/store';
import { ScmMap, ScriptFile } from '../../components/scm/model';
import { Game } from '../../models';

export const loadScmFile = createAction(
  '[SCM] Load File',
  props<{ name: string }>(),
);

export const loadMainFile = createAction(
  '[SCM] Load Main File',
);

export const loadScmFileSuccess = createAction(
  '[SCM] Load File Success',
  props<{ name: string; content: ScriptFile }>(),
);

export const loadScmOverlay = createAction(
  '[SCM] Load Overlay',
  props<{ game: Game }>(),
);

export const loadScmOverlaySuccess = createAction(
  '[SCM] Load Overlay Success',
  props<{ game: Game; overlay: Record<string, string> }>(),
);

export const loadScmMap = createAction(
  '[SCM] Load Map',
  props<{ game: Game }>(),
);

export const loadScmMapSuccess = createAction(
  '[SCM] Load Map Success',
  props<{ game: Game; map: ScmMap }>(),
);

export const selectScmLabelOffset = createAction(
  '[SCM] Select Label Offset',
  props<{ offset: number }>(),
);

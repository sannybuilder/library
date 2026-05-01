import { createAction, props } from '@ngrx/store';
import { KeyValueEntry, ScmMap, ScriptFile } from '../../components/scm/model';
import { Game } from '../../models';

export const loadScmFile = createAction(
  '[SCM] Load File',
  props<{ name: string }>(),
);

export const loadMainFile = createAction('[SCM] Load Main File');

export const loadScmFileSuccess = createAction(
  '[SCM] Load File Success',
  props<{ name: string; content: ScriptFile }>(),
);

export const loadScmFileError = createAction(
  '[SCM] Load File Error',
  props<{ name: string }>(),
);

export const loadVariableOverlay = createAction(
  '[SCM] Load Variable Overlay',
  props<{ game: Game }>(),
);

export const loadVariableOverlaySuccess = createAction(
  '[SCM] Load Variable Overlay Success',
  props<{
    game: Game;
    variables: KeyValueEntry[];
  }>(),
);

export const loadVariableOverlayError = createAction(
  '[SCM] Load Variable Overlay Error',
  props<{ game: Game }>(),
);

export const loadRefsOverlay = createAction(
  '[SCM] Load Refs Overlay',
  props<{ game: Game }>(),
);

export const loadRefsOverlaySuccess = createAction(
  '[SCM] Load Refs Overlay Success',
  props<{
    game: Game;
    refs: KeyValueEntry[];
  }>(),
);

export const loadRefsOverlayError = createAction(
  '[SCM] Load Refs Overlay Error',
  props<{ game: Game }>(),
);

export const loadCommentsOverlay = createAction(
  '[SCM] Load Comments Overlay',
  props<{ game: Game }>(),
);

export const loadCommentsOverlaySuccess = createAction(
  '[SCM] Load Comments Overlay Success',
  props<{
    game: Game;
    comments: KeyValueEntry[];
  }>(),
);

export const loadCommentsOverlayError = createAction(
  '[SCM] Load Comments Overlay Error',
  props<{ game: Game }>(),
);

export const updateScmRefs = createAction(
  '[SCM] Update Refs',
  props<{ refs: KeyValueEntry[] }>(),
);

export const updateScmVariables = createAction(
  '[SCM] Update Variables',
  props<{ variables: KeyValueEntry[] }>(),
);

export const updateScmComments = createAction(
  '[SCM] Update Comments',
  props<{ comments: KeyValueEntry[] }>(),
);

export const loadScmMap = createAction(
  '[SCM] Load Map',
  props<{ game: Game }>(),
);

export const loadScmMapSuccess = createAction(
  '[SCM] Load Map Success',
  props<{ game: Game; map: ScmMap }>(),
);

export const loadScmMapError = createAction(
  '[SCM] Load Map Error',
  props<{ game: Game }>(),
);

export const selectScmLabelOffset = createAction(
  '[SCM] Select Label Offset',
  props<{ offset: number }>(),
);

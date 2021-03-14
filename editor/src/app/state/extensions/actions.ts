import { createAction, props } from '@ngrx/store';
import { Command, Extension, Game, Modifier, ViewMode } from '../../models';

export const loadExtensions = createAction(
  'load extensions',
  props<{ game: Game }>()
);

export const loadExtensionsSuccess = createAction(
  'load extensions success',
  props<{ extensions: Extension[]; lastUpdate: number }>()
);

export const loadExtensionsError = createAction('load extensions error');

export const submitChanges = createAction('submit changes');

export const submitChangesSuccess = createAction(
  'update extensions success',
  props<{ lastUpdate: number }>()
);

export const updateCommand = createAction(
  'update single command',
  props<{
    command: Command;
    newExtension: string;
    oldExtension: string;
  }>()
);

export const toggleExtension = createAction(
  'toggle extension selection',
  props<{ extension: string }>()
);

import { createAction, props } from '@ngrx/store';
import { Command, Extension } from '../models';

export const loadExtensions = createAction('load extensions');
export const loadExtensionsSuccess = createAction(
  'load extensions success',
  props<{ extensions: Extension[]; lastUpdate: number }>()
);

export const loadExtensionsError = createAction('load extensions error');

export const updateExtensions = createAction(
  'update extensions',
  props<{ extensions: Extension[] }>()
);

export const updateExtensionsSuccess = createAction(
  'update extensions success',
  props<{ lastUpdate: number }>()
);

export const editCommand = createAction(
  'edit command',
  props<{ command: Command }>()
);

export const updateCommand = createAction(
  'update single command',
  props<{ command: Command; extension: string }>()
);

export const toggleExtension = createAction(
  'toggle extension selection',
  props<{ extension: string }>()
);

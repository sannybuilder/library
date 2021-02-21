import { createAction, props } from '@ngrx/store';
import { Command } from '../models';

export const getCommands = createAction('get commands');
export const getCommandsSuccess = createAction(
  'get commands success',
  props<{ commands: Command[]; lastUpdate: number }>()
);

export const getCommandsError = createAction('get commands error');

export const updateCommands = createAction(
  'update commands',
  props<{ commands: Command[] }>()
);

export const updateCommandsSuccess = createAction(
  'update commands success',
  props<{ lastUpdate: number }>()
);

export const editCommand = createAction(
  'edit command',
  props<{ command: Command }>()
);

export const updateCommand = createAction(
  'update single command',
  props<{ command: Command }>()
);

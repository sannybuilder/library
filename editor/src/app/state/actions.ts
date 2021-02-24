import { createAction, props } from '@ngrx/store';
import { Command, Extension, Game } from '../models';

export const loadExtensions = createAction(
  'load extensions',
  props<{ game: Game }>()
);
export const loadExtensionsSuccess = createAction(
  'load extensions success',
  props<{ extensions: Extension[]; lastUpdate: number }>()
);

export const loadExtensionsError = createAction('load extensions error');

export const updateExtensions = createAction(
  'update extensions',
  props<{ extensions: Extension[]; game: Game }>()
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
  props<{
    command: Command;
    newExtension: string;
    oldExtension: string;
    game: Game;
  }>()
);

export const toggleExtension = createAction(
  'toggle extension selection',
  props<{ extension: string }>()
);

export const updateSearchTerm = createAction(
  'update search term',
  props<{ term: string }>()
);

export const toggleCommandListElements = createAction(
  'toggle command list elements',
  props<{ flag: boolean }>()
);

import { createAction, props } from '@ngrx/store';
import { Command, Extension, Game } from '../../models';

export const loadExtensions = createAction(
  'load extensions',
  props<{ game: Game }>()
);

export const loadExtensionsSuccess = createAction(
  'load extensions success',
  props<{ game: Game; extensions: Extension[] }>()
);

export const updateCommand = createAction(
  'update single command',
  props<{
    command: Command;
    newExtension: string;
    oldExtension: string;
  }>()
);

export const updateGameCommand = createAction(
  'update single command for the given game',
  props<{
    game: Game;
    command: Command;
    newExtension: string;
    oldExtension: string;
  }>()
);

export const toggleExtension = createAction(
  'toggle extension selection',
  props<{ game: Game; extension: string }>()
);

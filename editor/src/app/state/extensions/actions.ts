import { createAction, props } from '@ngrx/store';
import { Command, Extension, Game } from '../../models';

export const loadExtensions = createAction(
  '[extensions] load',
  props<{ game: Game }>()
);

export const loadExtensionsSuccess = createAction(
  '[extensions] load success',
  props<{ game: Game; extensions: Extension[]; lastUpdate: number }>()
);

export const updateCommand = createAction(
  '[extensions] update single command',
  props<{
    command: Command;
    newExtension: string;
    oldExtension: string;
  }>()
);

export const updateGameCommand = createAction(
  '[extensions] update single command for the given game',
  props<{
    game: Game;
    command: Command;
    newExtension: string;
    oldExtension: string;
  }>()
);

import { createAction, props } from '@ngrx/store';
import { ClassMeta, Command, Extension, Game } from '../../models';

export interface GameCommandUpdate {
  command: Command;
  newExtension: string;
  oldExtension: string;
}

export const loadExtensions = createAction(
  '[extensions] load',
  props<{ game: Game }>()
);

export const loadExtensionsSuccess = createAction(
  '[extensions] load success',
  props<{
    game: Game;
    extensions: Extension[];
    version: string;
    lastUpdate: number;
    classes: ClassMeta[];
  }>()
);

export const updateCommands = createAction(
  '[extensions] batch update commands',
  props<{
    batch: GameCommandUpdate[];
  }>()
);

export const updateGameCommands = createAction(
  '[extensions] batch update commands for the given game',
  props<{
    game: Game;
    batch: GameCommandUpdate[];
  }>()
);

export const cloneCommand = createAction(
  '[extensions] clone command to the game',
  props<{
    game: Game;
    command: Command;
    extension: string;
  }>()
);

export const initSupportInfo = createAction('[extensions] init support info');

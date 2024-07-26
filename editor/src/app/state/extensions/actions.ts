import { createAction, props } from '@ngrx/store';
import { ClassMeta, Command, Extension, Game, SupportInfo } from '../../models';

export interface GameCommandUpdate {
  command: Command;
  newExtension: string;
  oldExtension: string;
  ignoreVersionAndPlatform: boolean;
}

export const init = createAction('[extensions] init');

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

export const loadExtensionsError = createAction(
  '[extensions] load error',
  props<{ game: Game }>()
)

export const updateCommands = createAction(
  '[extensions] batch update commands',
  props<{
    batch: GameCommandUpdate[];
    updateRelated: boolean;
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

export const initSupportInfo = createAction(
  '[extensions] init support info',
  props<{ game: Game }>()
);

export const loadSupportInfo = createAction(
  '[extensions] load support info',
  props<{ data: Record<Game, SupportInfo> }>()
);

export const loadSupportInfoError = createAction(
  '[extensions] load support info error',
);

export const markCommandsToDelete = createAction(
  '[extensions] mark commands to delete',
  props<{ names: string[], game: Game }>()
);

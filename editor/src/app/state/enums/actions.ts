import { createAction, props } from '@ngrx/store';
import { EnumRaw, Enums, Game } from '../../models';

export const loadEnums = createAction('[enums] load', props<{ game: Game }>());

export const loadEnumsSuccess = createAction(
  '[enums] load success',
  props<{ game: Game; enums: Enums }>()
);

export const loadEnumsError = createAction(
  '[enums] load error',
);

export const updateEnum = createAction(
  '[enums] update enum',
  props<{
    enumToEdit: EnumRaw;
    oldEnumToEdit: EnumRaw;
  }>()
);

export const updateGameEnum = createAction(
  '[enums] update enum for the given game',
  props<{
    game: Game;
    enumToEdit: EnumRaw;
    oldEnumToEdit: EnumRaw;
  }>()
);

export const renameGameEnum = createAction(
  '[enums] rename enum for the given game',
  props<{
    game: Game;
    newEnumName: string;
    oldEnumName: string;
    isAffected: boolean;
  }>()
);

export const cloneEnum = createAction(
  '[enums] clone enum to the game',
  props<{
    game: Game;
    enumToClone: EnumRaw;
  }>()
);

export const loadEnumsInfo = createAction('[game] load enums info');

export const loadEnumsInfoSuccess = createAction(
  '[game] load enums info success',
  props<{ data: Record<Game, string[]> }>()
);

import { createAction, props } from '@ngrx/store';
import { EnumRaw, Enums, Game } from '../../models';

export const loadEnums = createAction('[enums] load', props<{ game: Game }>());

export const loadEnumsSuccess = createAction(
  '[enums] load success',
  props<{ game: Game; enums: Enums }>()
);

export const updateEnum = createAction(
  '[enums] update enum',
  props<{
    enumToEdit: EnumRaw;
    oldEnumToEdit: EnumRaw;
  }>()
);

export const updateGameEnum = createAction(
  '[extensions] update enum for the given game',
  props<{
    game: Game;
    enumToEdit: EnumRaw;
    oldEnumToEdit: EnumRaw;
  }>()
);

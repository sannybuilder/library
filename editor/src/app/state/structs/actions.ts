import { createAction, props } from '@ngrx/store';
import { StructRaw, Game, Structs } from '../../models';

export const loadStructs = createAction(
  '[structs] load',
  props<{ game: Game }>()
);

export const loadStructsSuccess = createAction(
  '[structs] load success',
  props<{ game: Game; structs: Structs }>()
);

export const loadStructsError = createAction(
  '[structs] load error',
  props<{ game: Game }>()
);

export const updateStruct = createAction(
  '[structs] update struct',
  props<{
    structToEdit: StructRaw;
    oldStructToEdit: StructRaw;
  }>()
);

export const updateGameStruct = createAction(
  '[structs] update struct for the given game',
  props<{
    game: Game;
    structToEdit: StructRaw;
    oldStructToEdit: StructRaw;
  }>()
);

export const renameGameStruct = createAction(
  '[structs] rename struct for the given game',
  props<{
    game: Game;
    newStructName: string;
    oldStructName: string;
    isAffected: boolean;
  }>()
);

export const cloneStruct = createAction(
  '[structs] clone struct to the game',
  props<{
    game: Game;
    structToClone: StructRaw;
  }>()
);

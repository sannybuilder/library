import { createAction, props } from '@ngrx/store';
import { Enums, Game } from '../../models';

export const loadEnums = createAction('[enums] load', props<{ game: Game }>());

export const loadEnumsSuccess = createAction(
  '[enums] load success',
  props<{ game: Game; enums: Enums }>()
);

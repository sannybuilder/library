import { createAction, props } from '@ngrx/store';
import { Enums, Game } from '../../models';

export const loadEnums = createAction(
  'load game enums',
  props<{ game: Game }>()
);

export const loadEnumsSuccess = createAction(
  'load enums success',
  props<{ game: Game; enums: Enums }>()
);

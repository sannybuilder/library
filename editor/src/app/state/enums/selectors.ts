import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Enums, Game } from '../../models';
import { game } from '../game/selectors';
import { EnumsState } from './reducer';

export const state = createFeatureSelector('enums');

export const enums = createSelector(
  state,
  game,
  (state: EnumsState, game: Game) => state.enums[game]
);

export const enumNames = createSelector(enums, (enums) =>
  Object.keys(enums ?? {})
);

export const enumFields = createSelector(
  enums,
  (enums: Enums, props: { enumName: string }) => enums?.[props.enumName]
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Enums, Game } from '../../models';
import { game } from '../game/selectors';
import { EnumsState } from './reducer';

export const state = createFeatureSelector<EnumsState>('enums');

export const enums = createSelector(
  state,
  game,
  (state: EnumsState, game: Game | undefined) =>
    game ? state.enums[game] : undefined
);

export const enumNames = createSelector(enums, (enums) =>
  Object.keys(enums ?? {})
);

export const enumFields = createSelector(
  enums,
  (enums: Enums | undefined, props: { enumName: string }) =>
    enums?.[props.enumName]
);

export const gameEnums = createSelector(
  state,
  (state: EnumsState, props: { game: Game }) => state.enums[props.game] ?? {}
);

export const gamesWhereExist = createSelector(
  state,
  (state: EnumsState, props: { enumName: string }) => {
    return (Object.keys(state.enums) as Game[]).filter(
      (game: Game) => !!state.enums[game]?.[props.enumName]
    );
  }
);

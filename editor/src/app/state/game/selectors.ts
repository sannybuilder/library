import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from './reducer';

export const state = createFeatureSelector<GameState>('game');

export const game = createSelector(state, (state: GameState) => state.game);

export const primitiveTypes = createSelector(
  state,
  (state: GameState) => state.primitiveTypes
);

export const viewContext = createSelector(
  state,
  (state: GameState) => state.viewContext
);

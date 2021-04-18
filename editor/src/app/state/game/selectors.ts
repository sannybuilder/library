import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Command, SupportInfo } from '../../models';
import { GameState } from './reducer';

export const state = createFeatureSelector('game');

export const game = createSelector(state, (state: GameState) => state.game);

export const supportInfo = createSelector(
  state,
  (state: GameState) => state.supportInfo
);

export const commandSupportInfo = createSelector(
  supportInfo,
  (supportInfo: SupportInfo, props: { command: Command; extension: string }) =>
    supportInfo?.[props.extension]?.[props.command.id]
);

export const primitiveTypes = createSelector(
  state,
  (state: GameState) => state.primitiveTypes
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './reducer';

export const root = createFeatureSelector('root');

export const commandsSelector = () =>
  createSelector(root, (state: State) => state.commands);

export const errorSelector = () =>
  createSelector(root, (state: State) => state.error);

export const editCommandSelector = () =>
  createSelector(root, (state: State) => state.editCommand);

export const loadingSelector = () =>
  createSelector(root, (state: State) => state.loading);

export const lastUpdateSelector = () =>
  createSelector(root, (state: State) => state.lastUpdate);

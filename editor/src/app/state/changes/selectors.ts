import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChangesState } from './reducer';

export const state = createFeatureSelector('changes');

export const changes = createSelector(
  state,
  (state: ChangesState) => state.changes
);

export const changesCount = createSelector(
  changes,
  (changes: Map<string, string>) => changes.size
);

export const github = createSelector(
  state,
  (state: ChangesState) => state.github
);

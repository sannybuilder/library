import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChangesState } from './reducer';

export const state = createFeatureSelector<ChangesState>('changes');

export const changes = createSelector(
  state,
  (state: ChangesState) => state.changes
);

export const snapshots = createSelector(
  state,
  (state: ChangesState) => state.snapshots
);

export const hasChanges = createSelector(
  state,
  (state: ChangesState) => state.hasChanges
);

export const github = createSelector(
  state,
  (state: ChangesState) => state.github
);

export const isUpdating = createSelector(
  state,
  (state: ChangesState) => state.isUpdating
);

export const lastRevision = createSelector(
  state,
  (state: ChangesState) => state.lastRevision
);
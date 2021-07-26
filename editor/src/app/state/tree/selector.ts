import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TreeState } from './reducer';

export const state = createFeatureSelector<TreeState>('tree');

export const currentNode = createSelector(
  state,
  (state: TreeState) => state.currentNode
);

export const nextNodes = createSelector(currentNode, (node) => node?.next);

export const currentLine = createSelector(state, (state) =>
  state.historyLine.join(' ').replace(/ ,/g, ',')
);

export const dictionary = createSelector(state, (state) => state.dictionary);

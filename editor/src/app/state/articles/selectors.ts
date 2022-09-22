import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState } from './reducer';

export const state = createFeatureSelector<ArticlesState>('articles');

export const currentArticle = createSelector(
  state,
  (state: ArticlesState | undefined) => state?.currentArticle
);

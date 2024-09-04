import { createReducer, on } from '@ngrx/store';
import { loadArticle, loadArticleSuccess } from './actions';

export interface ArticlesState {
  currentArticle?: string;
  source?: string;
}

export const initialState: ArticlesState = {};

export const articlesReducer = createReducer(
  initialState,
  on(loadArticle, () => initialState),
  on(loadArticleSuccess, (state, { content, source }) => ({
    ...state,
    currentArticle: content,
    source,
  }))
);

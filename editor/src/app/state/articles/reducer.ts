import { createReducer, on } from '@ngrx/store';
import { loadArticle, loadArticleSuccess } from './actions';

export interface ArticlesState {
  currentArticle?: string;
}

export const initialState: ArticlesState = {};

export const articlesReducer = createReducer(
  initialState,
  on(loadArticle, (state) => ({ ...state, currentArticle: undefined })),
  on(loadArticleSuccess, (state, { content }) => ({
    ...state,
    currentArticle: content,
  }))
);

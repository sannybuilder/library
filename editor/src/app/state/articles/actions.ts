import { createAction, props } from '@ngrx/store';

export const loadArticle = createAction(
  '[Articles] Load Article',
  props<{ name: string }>()
);

export const loadArticleSuccess = createAction(
  '[Articles] Load Article Success',
  props<{ content: string, source: string }>()
);

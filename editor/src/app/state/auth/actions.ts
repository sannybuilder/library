import { createAction, props } from '@ngrx/store';

export const enter = createAction(
  '[auth] app enter',
  props<{ accessToken?: string }>()
);

export const authorize = createAction('[auth] authorize');

export const authorizeFail = createAction('[auth] authorize fail');

export const authorizeSuccess = createAction(
  '[auth] authorize success',
  props<{ accessToken: string }>()
);

export const gotUser = createAction(
  '[auth] got user',
  props<{ login: string; avatarUrl: string; profileUrl: string }>()
);

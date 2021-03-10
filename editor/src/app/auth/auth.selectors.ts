import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const state = createFeatureSelector('auth');

export const userNameSelector = createSelector(
  state,
  (state: AuthState) => state.userName
);

export const avatarUrlSelector = createSelector(
  state,
  (state: AuthState) => state.avatar_url
);

export const authTokenSelector = createSelector(
  state,
  (state: AuthState) => state.access_token
);

export const isAuthorizedSelector = createSelector(
  authTokenSelector,
  (token: string) => !!token
);

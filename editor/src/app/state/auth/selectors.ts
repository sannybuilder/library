import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducer';

export const state = createFeatureSelector('auth');

export const userNameSelector = createSelector(
  state,
  (state: AuthState) => state.userName
);

export const avatarUrlSelector = createSelector(
  state,
  (state: AuthState) => state.avatarUrl
);

export const authTokenSelector = createSelector(
  state,
  (state: AuthState) => state.accessToken
);

export const isAuthorizedSelector = createSelector(
  authTokenSelector,
  (token: string) => !!token
);

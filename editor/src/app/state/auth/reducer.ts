import { Action, createReducer, on } from '@ngrx/store';
import { authorizeSuccess, authorizeFail, gotUser } from './actions';

export interface AuthState {
  userName: string;
  accessToken?: string;
  avatarUrl?: string;
  profileUrl?: string;
}

export const initialState: AuthState = {
  userName: 'guest',
};

const _reducer = createReducer(
  initialState,
  on(gotUser, (state, { login, avatarUrl, profileUrl }) => ({
    ...state,
    avatarUrl,
    profileUrl,
    userName: login,
  })),
  on(authorizeSuccess, (state, { accessToken }) => ({
    ...state,
    accessToken,
  })),
  on(authorizeFail, () => ({
    ...initialState,
  }))
);

export function authReducer(state: AuthState, action: Action) {
  return _reducer(state, action);
}

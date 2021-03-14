import { Action, createReducer, on } from '@ngrx/store';
import { authorizeSuccess, authorizeFail, gotUser } from './actions';

export interface AuthState {
  userName: string;
  access_token?: string;
  avatar_url?: string;
}

export const initialState: AuthState = {
  userName: 'guest',
};

const _reducer = createReducer(
  initialState,
  on(gotUser, (state, { login, avatar_url }) => ({
    ...state,
    avatar_url,
    userName: login,
  })),
  on(authorizeSuccess, (state, { access_token }) => ({
    ...state,
    access_token,
  })),
  on(authorizeFail, () => ({
    ...initialState,
  }))
);

export function authReducer(state: AuthState, action: Action) {
  return _reducer(state, action);
}

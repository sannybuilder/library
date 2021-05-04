import { createReducer, on } from '@ngrx/store';
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

export const authReducer = createReducer<AuthState>(
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

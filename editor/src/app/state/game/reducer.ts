import { Action, createReducer, on } from '@ngrx/store';
import { Game, SupportInfo } from '../../models';
import { onListEnter, loadSupportInfoSuccess } from './actions';

export interface GameState {
  game?: Game;
  supportInfo?: SupportInfo;
}

export const initialState: GameState = {};

const _reducer = createReducer(
  initialState,
  on(onListEnter, (state, { game }) => ({
    ...state,
    game,
  })),
  on(loadSupportInfoSuccess, (state, { supportInfo }) => ({
    ...state,
    supportInfo,
  }))
);

export function gameReducer(state: GameState, action: Action) {
  return _reducer(state, action);
}

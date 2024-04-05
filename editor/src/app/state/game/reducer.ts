import { createReducer, on } from '@ngrx/store';
import { Game, PrimitiveType } from '../../models';
import { onListEnter } from './actions';
import { primitiveTypes } from '../../utils';

export interface GameState {
  game?: Game;
  primitiveTypes: PrimitiveType[];
}

export const initialState: GameState = {
  primitiveTypes: [],
};

export const gameReducer = createReducer(
  initialState,
  on(onListEnter, (state, { game }) => ({
    ...state,
    game,
    primitiveTypes: primitiveTypes(game),
  }))
);


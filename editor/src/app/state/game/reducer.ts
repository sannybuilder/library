import { createReducer, on } from '@ngrx/store';
import { ViewContext, Game, PrimitiveType } from '../../models';
import { onListEnter } from './actions';
import { primitiveTypes } from '../../utils';

export interface GameState {
  game?: Game;
  viewContext: ViewContext;
  primitiveTypes: PrimitiveType[];
}

export const initialState: GameState = {
  primitiveTypes: [],
  viewContext: ViewContext.Script,
};

export const gameReducer = createReducer(
  initialState,
  on(onListEnter, (state, { game, viewContext }) => ({
    ...state,
    game,
    viewContext: viewContext ?? ViewContext.Script,
    primitiveTypes: primitiveTypes(game, viewContext ?? ViewContext.Script),
  }))
);

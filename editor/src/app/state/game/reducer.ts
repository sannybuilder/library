import { Action, createReducer, on } from '@ngrx/store';
import { Game, PrimitiveType } from '../../models';
import { onListEnter } from './actions';

export interface GameState {
  game?: Game;
  primitiveTypes?: PrimitiveType[];
}

export const initialState: GameState = {};

const _reducer = createReducer(
  initialState,
  on(onListEnter, (state, { game }) => ({
    ...state,
    game,
    primitiveTypes: primitiveTypes(game),
  }))
);

export function gameReducer(state: GameState, action: Action) {
  return _reducer(state, action);
}

function primitiveTypes(game: Game): PrimitiveType[] {
  const types = [
    PrimitiveType.any,
    PrimitiveType.arguments,
    PrimitiveType.boolean,
    PrimitiveType.float,
    PrimitiveType.int,
    PrimitiveType.label,
    PrimitiveType.string,
    PrimitiveType.model_any,
    PrimitiveType.model_ide,
    PrimitiveType.gxt_key,
  ];

  if (game === Game.SA) {
    types.push(PrimitiveType.string128, PrimitiveType.int_script_id);
  }

  return types.sort();
}

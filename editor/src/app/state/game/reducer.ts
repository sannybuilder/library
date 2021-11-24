import { createReducer, on } from '@ngrx/store';
import { Game, PrimitiveType } from '../../models';
import { onListEnter } from './actions';

export interface GameState {
  game?: Game;
  gameName?: string;
  primitiveTypes: PrimitiveType[];
}

export const initialState: GameState = {
  primitiveTypes: [],
};

export const gameReducer = createReducer(
  initialState,
  on(onListEnter, (state, { game, gameName }) => ({
    ...state,
    game,
    gameName,
    primitiveTypes: primitiveTypes(game),
  }))
);

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
    PrimitiveType.model_char,
    PrimitiveType.model_object,
    PrimitiveType.model_vehicle,
    PrimitiveType.gxt_key,
    PrimitiveType.zone_key,
  ];

  if (game === Game.SA) {
    types.push(PrimitiveType.string128, PrimitiveType.int_script_id);
  }

  return types.sort();
}

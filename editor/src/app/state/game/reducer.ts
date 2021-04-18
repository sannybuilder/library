import { Action, createReducer, on } from '@ngrx/store';
import { Game, PrimitiveType, SupportInfo } from '../../models';
import { onListEnter, loadSupportInfoSuccess } from './actions';

export interface GameState {
  game?: Game;
  supportInfo?: SupportInfo;
  primitiveTypes?: PrimitiveType[];
}

export const initialState: GameState = {};

const _reducer = createReducer(
  initialState,
  on(onListEnter, (state, { game }) => ({
    ...state,
    game,
    primitiveTypes: primitiveTypes(game),
  })),
  on(loadSupportInfoSuccess, (state, { supportInfo }) => ({
    ...state,
    supportInfo,
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
    PrimitiveType.int_model_any,
    PrimitiveType.int_model_ide,
    PrimitiveType.string_gxt,
  ];

  if (game === Game.SA) {
    types.push(PrimitiveType.string128, PrimitiveType.int_script_id);
  }

  return types.sort();
}

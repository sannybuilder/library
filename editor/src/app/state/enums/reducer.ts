import { Action, createReducer, on } from '@ngrx/store';
import { Enums, Game } from '../../models';
import { loadEnumsSuccess, updateGameEnum } from './actions';
import { fromPairs } from 'lodash';

export interface EnumsState {
  enums: Partial<Record<Game, Enums>>;
}

export const initialState: EnumsState = {
  enums: {},
};

const _reducer = createReducer(
  initialState,
  on(loadEnumsSuccess, (state, { game, enums }) =>
    updateState(state, game, enums)
  ),
  on(updateGameEnum, (state, { enumToEdit, oldEnumToEdit, game }) => {
    return updateState(state, game, {
      [enumToEdit.name]: fromPairs(enumToEdit.fields),
    });
  })
);

function updateState(
  state: EnumsState,
  game: Game,
  newState: Partial<EnumsState>
) {
  return {
    ...state,
    enums: {
      ...state.enums,
      [game]: { ...(state.enums[game] ?? {}), ...newState },
    },
  };
}

export function enumsReducer(state: EnumsState, action: Action) {
  return _reducer(state, action);
}

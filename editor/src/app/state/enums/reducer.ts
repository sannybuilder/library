import { Action, createReducer, on } from '@ngrx/store';
import { Enums, Game } from '../../models';
import { loadEnumsSuccess } from './actions';

export interface EnumsState {
  enums: Partial<Record<Game, Enums>>;
}

export const initialState: EnumsState = {
  enums: {},
};

const _reducer = createReducer(
  initialState,
  on(loadEnumsSuccess, (state, { game, enums }) => ({
    ...state,
    enums: {
      ...state.enums,
      [game]: enums,
    },
  }))
);

export function enumsReducer(state: EnumsState, action: Action) {
  return _reducer(state, action);
}

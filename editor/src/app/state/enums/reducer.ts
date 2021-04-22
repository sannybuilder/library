import { Action, createReducer, on } from '@ngrx/store';
import { Enums, Game } from '../../models';
import { loadEnumsSuccess, updateGameEnum } from './actions';
import { fromPairs, mapValues } from 'lodash';

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
    const newState = {
      [enumToEdit.name]: enumToEdit.fields?.length
        ? transformEnum(fromPairs(enumToEdit.fields))
        : undefined,
    };
    return updateState(
      state,
      game,
      oldEnumToEdit.name
        ? {
            [oldEnumToEdit.name]: undefined,
            ...newState,
          }
        : newState
    );
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

function transformEnum(enumToEdit: Record<string, string | number | null>) {
  return mapValues(enumToEdit, (v) => {
    if (v == null || v === '') {
      return null;
    }

    const matches = /^"(.*)"$/.exec(v.toString());
    return matches ? matches[1] : v;
  });
}

export function enumsReducer(state: EnumsState, action: Action) {
  return _reducer(state, action);
}

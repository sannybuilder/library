import { Action, createReducer, on } from '@ngrx/store';
import { EnumRaw, Enums, Game } from '../../models';
import { loadEnumsSuccess, renameGameEnum, updateGameEnum } from './actions';
import { fromPairs, mapValues } from 'lodash';
import { smash } from '../../utils';

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
      [oldEnumToEdit.name]: enumToEdit.fields?.length
        ? makeEnum(enumToEdit.fields)
        : undefined,
    };
    return updateState(state, game, newState);
  }),
  on(renameGameEnum, (state, { newEnumName, oldEnumName, game }) => {
    const currentEnum = state.enums[game]?.[oldEnumName];

    if (!currentEnum) {
      return state;
    }
    return updateState(state, game, {
      [oldEnumName]: undefined,
      [newEnumName]: newEnumName ? currentEnum : undefined,
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
      [game]: smash({ ...(state.enums[game] ?? {}), ...newState }),
    },
  };
}

function makeEnum(enumToEdit: EnumRaw['fields']) {
  return mapValues(fromPairs(enumToEdit), (v) => {
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

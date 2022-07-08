import { createReducer, on } from '@ngrx/store';
import { EnumRaw, Enums, Game } from '../../models';
import {
  loadEnumsSuccess,
  renameGameEnum,
  updateGameEnum,
  loadEnumsInfoSuccess,
} from './actions';
import { fromPairs, mapValues } from 'lodash';
import { evaluateEnumValues, smash } from '../../utils';

export interface EnumsState {
  enums: Partial<Record<Game, Enums>>;
}

export const initialState: EnumsState = {
  enums: {},
};

export const enumsReducer = createReducer(
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
  }),
  on(loadEnumsInfoSuccess, (state, { data }) => {
    return Object.entries(data).reduce((s, [game, names]) => {
      return updateState(
        s,
        game as Game,
        names.reduce((m, v) => {
          m[v] ??= {};
          return m;
        }, (state.enums[game as Game] as Enums) ?? {})
      );
    }, state);
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
      // enforce the game's state as an object
      // it lets enums$ emit a truthy value and pass the emptyness check in the Ui onload effect
      [game]: smash({ ...(state.enums[game] ?? {}), ...newState }) ?? {},
    },
  };
}

function makeEnum(fields: EnumRaw['fields']) {
  return mapValues(fromPairs(evaluateEnumValues(fields)), (v) => {
    if (v == null || v === '') {
      return null;
    }

    const matches = /^"(.*)"$/.exec(v.toString());
    return matches ? matches[1] : v;
  });
}

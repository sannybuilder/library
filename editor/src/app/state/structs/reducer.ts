import { createReducer, on } from '@ngrx/store';
import {  Game, Structs } from '../../models';
import {
  loadStructsSuccess,
  renameGameStruct,
  updateGameStruct,
  loadStructsError,
} from './actions';
import { EnumsState } from '../enums/reducer';
import { smash } from 'src/app/utils';

export interface StructsState {
  structs: Partial<Record<Game, Structs>>;
}

export const initialState: StructsState = {
  structs: {},
};

export const structsReducer = createReducer(
  initialState,
  on(loadStructsSuccess, (state, { game, structs }) =>
    updateState(state, game, structs)
  ),
  on(loadStructsError, (state, { game }) => updateState(state, game, {})),
  on(updateGameStruct, (state, { structToEdit, oldStructToEdit, game }) => {
    const newState = {
      [oldStructToEdit.name]: structToEdit.fields?.length
        ? { name: structToEdit.name, fields: structToEdit.fields }
        : undefined,
    };
    return updateState(state, game, newState);
  }),
  on(renameGameStruct, (state, { newStructName, oldStructName, game }) => {
    const currentStruct = state.structs[game]?.[oldStructName];

    if (!currentStruct) {
      return state;
    }
    return updateState(state, game, {
      [oldStructName]: undefined,
      [newStructName]: newStructName ? currentStruct : undefined,
    });
  })
);

function updateState(
  state: StructsState,
  game: Game,
  newState: Partial<StructsState>
) {
  return {
    ...state,
    structs: {
      ...state.structs,
      [game]: smash({ ...(state.structs[game] ?? {}), ...newState }) ?? {},
    },
  };
}

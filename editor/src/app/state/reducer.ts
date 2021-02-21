import { Action, createReducer, on } from '@ngrx/store';
import { Command, Extension } from '../models';
import {
  editCommand,
  loadExtensions,
  loadExtensionsError,
  loadExtensionsSuccess,
  toggleExtension,
  updateCommand,
  updateExtensionsSuccess,
} from './actions';
import { flatMap, without } from 'lodash';

export interface State {
  extensions?: Extension[];
  lastUpdate?: number;
  error?: string;
  editCommand?: Command;
  loading: boolean;
  selectedExtensions?: string[];
}

export const initialState: State = {
  loading: false,
};

const _reducer = createReducer(
  initialState,
  on(loadExtensions, (state) => ({ ...state, loading: true })),
  on(loadExtensionsSuccess, (state, { extensions, lastUpdate }) => ({
    ...state,
    loading: false,
    lastUpdate,
    extensions,
    selectedExtensions: extensions.map((e) => e.name),
  })),
  on(loadExtensionsError, (state) => ({
    ...state,
    commands: [],
    loading: false,
    error: `Error: can't load commands`,
  })),
  on(editCommand, (state, { command: editCommand }) => ({
    ...state,
    editCommand,
  })),
  on(updateCommand, (state, { command: newCommand, extension }) => {
    const extensions = flatMap(state.extensions, (e) => {
      if (e.name === extension) {
        return {
          ...e,
          commands: e.commands.map((c) => {
            if (c.id === newCommand.id) {
              return newCommand;
            }
            return c;
          }),
        };
      }
      return e;
    });
    return { ...state, extensions };
  }),
  on(updateExtensionsSuccess, (state, { lastUpdate }) => ({
    ...state,
    lastUpdate,
  })),
  on(toggleExtension, (state, { extension }) => {
    const selectedExtensions = state.selectedExtensions.includes(extension)
      ? without(state.selectedExtensions, extension)
      : [...state.selectedExtensions, extension];
    return { ...state, selectedExtensions };
  })
);

export function reducer(state: State, action: Action) {
  return _reducer(state, action);
}

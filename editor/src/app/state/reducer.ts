import { Action, createReducer, on } from '@ngrx/store';
import { Command } from '../models';
import {
  editCommand,
  getCommands,
  getCommandsError,
  getCommandsSuccess,
  updateCommand,
  updateCommandsSuccess,
} from './actions';

export interface State {
  commands: Command[];
  lastUpdate?: number;
  error?: string;
  editCommand?: Command;
  loading: boolean;
}

export const initialState: State = {
  commands: [],
  loading: false,
};

const _reducer = createReducer(
  initialState,
  on(getCommands, (state) => ({ ...state, loading: true })),
  on(getCommandsSuccess, (state, { commands, lastUpdate }) => ({
    ...state,
    loading: false,
    lastUpdate,
    commands,
  })),
  on(getCommandsError, (state) => ({
    ...state,
    commands: [],
    loading: false,
    error: `Error: can't load commands`,
  })),
  on(editCommand, (state, { command: editCommand }) => ({
    ...state,
    editCommand,
  })),
  on(updateCommand, (state, { command: newCommand }) => {
    const newCommands = state.commands.map((c) => {
      if (c.id === newCommand.id) {
        return newCommand;
      }
      return c;
    });
    return { ...state, commands: newCommands };
  }),
  on(updateCommandsSuccess, (state, { lastUpdate }) => ({
    ...state,
    lastUpdate,
  }))
);

export function reducer(state: State, action: Action) {
  return _reducer(state, action);
}

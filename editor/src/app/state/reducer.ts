import { Action, createReducer, on } from '@ngrx/store';
import { Command, Extension } from '../models';
import {
  editCommand,
  loadExtensions,
  loadExtensionsError,
  loadExtensionsSuccess,
  toggleCommandListElements,
  toggleExtension,
  toggleFilter,
  updateCommand,
  updateExtensionsSuccess,
  updateSearchTerm,
} from './actions';
import { without, sortBy } from 'lodash';

export interface State {
  extensions?: Extension[];
  lastUpdate?: number;
  error?: string;
  editCommand?: Command;
  loading: boolean;
  selectedExtensions?: string[];
  searchTerm?: string;
  displaySearchBar: boolean;
  displayLastUpdated: boolean;
  selectedFilters: string[];
}

export const initialState: State = {
  loading: false,
  displayLastUpdated: false,
  displaySearchBar: false,
  selectedFilters: [],
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
  on(
    updateCommand,
    (state, { command: newCommand, newExtension: name, oldExtension }) => {
      let tickExtension = null;
      let untickExtension = null;
      let extensions = upsertBy(
        state.extensions,
        'name',
        name,
        (e) => ({
          ...e,
          commands: upsertBy(
            e.commands,
            'id',
            newCommand.id,
            () => newCommand,
            () => newCommand
          ),
        }),
        () => {
          tickExtension = name;
          return {
            name,
            commands: [newCommand],
          };
        }
      );

      if (name !== oldExtension) {
        // remove from previous collection
        extensions = upsertBy(extensions, 'name', oldExtension, (e) => {
          const commands = upsertBy(e.commands, 'id', newCommand.id);
          if (!commands.length) {
            // remove previous collection ifit is empty
            untickExtension = oldExtension;
            return null;
          }
          return {
            ...e,
            commands,
          };
        });
      }

      const selectedExtensions =
        untickExtension !== null
          ? state.selectedExtensions.filter((s) => s !== untickExtension)
          : [...state.selectedExtensions];

      if (tickExtension !== null) {
        selectedExtensions.push(tickExtension);
        selectedExtensions.sort();
      }

      return { ...state, extensions, selectedExtensions };
    }
  ),
  on(updateExtensionsSuccess, (state, { lastUpdate }) => ({
    ...state,
    lastUpdate,
  })),
  on(toggleExtension, (state, { extension }) => {
    const selectedExtensions = state.selectedExtensions.includes(extension)
      ? without(state.selectedExtensions, extension)
      : [...state.selectedExtensions, extension];
    return { ...state, selectedExtensions };
  }),
  on(toggleFilter, (state, { filter }) => {
    const selectedFilters = state.selectedFilters.includes(filter)
      ? without(state.selectedFilters, filter)
      : [...state.selectedFilters, filter];
    return { ...state, selectedFilters };
  }),
  on(updateSearchTerm, (state, { term: searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(toggleCommandListElements, (state, { flag }) => ({
    ...state,
    displaySearchBar: flag,
    displayLastUpdated: flag,
  }))
);

export function reducer(state: State, action: Action) {
  return _reducer(state, action);
}

function upsertBy<T extends object, Key extends keyof T>(
  collection: T[],
  key: Key,
  needle: T[Key],
  onFound: (element: T) => T | null = () => null,
  onDefault: () => T | null = () => null
): T[] {
  let found = false;
  const newCollection: T[] = [];

  for (let i = 0; i < collection.length; i++) {
    if (collection[i][key] === needle) {
      found = true;
      const newItem = onFound(collection[i]);
      if (newItem !== null) {
        newCollection.push(onFound(collection[i]));
      }
    } else {
      newCollection.push(collection[i]);
    }
  }
  if (!found) {
    const newItem = onDefault();
    if (newItem !== null) {
      newCollection.push(newItem);
      return sortBy(newCollection, key);
    }
  }

  return newCollection;
}

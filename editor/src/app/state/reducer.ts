import { Action, createReducer, on } from '@ngrx/store';
import { Command, Extension, Game, ViewMode } from '../models';
import {
  displayOrEditCommandInfo,
  loadExtensions,
  loadExtensionsError,
  loadExtensionsSuccess,
  stopEditOrDisplay,
  toggleCommandListElements,
  toggleExtension,
  toggleFilter,
  updateCommand,
  submitChangesSuccess,
  updateSearchTerm,
  onListEnter,
} from './actions';
import { without, sortBy } from 'lodash';

export interface RootState {
  extensions?: Extension[];
  lastUpdate?: number;
  error?: string;
  loading: boolean;
  selectedExtensions?: string[];
  searchTerm?: string;
  displaySearchBar: boolean;
  displayLastUpdated: boolean;
  selectedFiltersOnly: string[];
  selectedFiltersExcept: string[];
  commandToDisplayOrEdit?: Command;
  extensionToDisplayOrEdit?: string;
  viewMode: ViewMode;
  game?: Game;
  opcodeOnLoad?: string;
  extensionOnLoad?: string;
  entities?: Record<string, string[]>;
  changesCount: number;
}

export const initialState: RootState = {
  loading: false,
  displayLastUpdated: false,
  displaySearchBar: false,
  viewMode: ViewMode.None,
  selectedFiltersOnly: [],
  selectedFiltersExcept: ['is_nop', 'is_unsupported'],
  changesCount: 0,
};

const _reducer = createReducer(
  initialState,
  on(loadExtensions, (state, { game }) => ({
    ...state,
    game,
    loading: true,
    changesCount: 0,
  })),
  on(loadExtensionsSuccess, (state, { extensions, lastUpdate }) => ({
    ...state,
    loading: false,
    lastUpdate,
    extensions,
    selectedExtensions: extensions.map((e) => e.name),
    entities: getEntities(extensions),
  })),
  on(loadExtensionsError, (state) => ({
    ...state,
    commands: [],
    loading: false,
    error: `Error: can't load commands`,
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

      const entities = getEntities(extensions);

      return {
        ...state,
        extensions,
        selectedExtensions,
        entities,
        changesCount: state.changesCount + 1,
      };
    }
  ),
  on(submitChangesSuccess, (state, { lastUpdate }) => ({
    ...state,
    lastUpdate,
    changesCount: 0,
  })),
  on(toggleExtension, (state, { extension }) => {
    const selectedExtensions = state.selectedExtensions.includes(extension)
      ? without(state.selectedExtensions, extension)
      : [...state.selectedExtensions, extension];
    return { ...state, selectedExtensions };
  }),
  on(toggleFilter, (state, { filter, modifier }) => {
    const filters =
      modifier === 'only'
        ? state.selectedFiltersOnly
        : state.selectedFiltersExcept;
    const selectedFilters = filters.includes(filter)
      ? without(filters, filter)
      : [...filters, filter];
    return {
      ...state,
      [modifier === 'only'
        ? 'selectedFiltersOnly'
        : 'selectedFiltersExcept']: selectedFilters,
    };
  }),
  on(updateSearchTerm, (state, { term: searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(toggleCommandListElements, (state, { flag }) => ({
    ...state,
    displaySearchBar: flag,
    displayLastUpdated: flag,
  })),
  on(displayOrEditCommandInfo, (state, { command, extension, viewMode }) => ({
    ...state,
    viewMode,
    commandToDisplayOrEdit: command,
    extensionToDisplayOrEdit: extension,
  })),
  on(stopEditOrDisplay, (state) => ({
    ...state,
    commandToDisplayOrEdit: undefined,
    extensionToDisplayOrEdit: undefined,
    viewMode: ViewMode.None,
  })),
  on(onListEnter, (state, { game, opcode, extension }) => ({
    ...state,
    game,
    opcodeOnLoad: opcode,
    extensionOnLoad: extension,
  }))
);

export function rootReducer(state: RootState, action: Action) {
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

function getEntities(extensions: Extension[]): Record<string, string[]> {
  return extensions.reduce((m, e) => {
    const set = e.commands
      .filter((command) => command.attrs.is_constructor)
      .reduce((entities, command) => {
        const last = command.output[command.output.length - 1];
        if (!last) {
          return [];
        }
        entities.add(last.type);
        return entities;
      }, new Set());

    (m[e.name] ??= []).push(...set);
    return m;
  }, {});
}

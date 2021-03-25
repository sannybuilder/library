import { Action, createReducer, on } from '@ngrx/store';
import { Extension, Game } from '../../models';
import {
  loadExtensions,
  loadExtensionsSuccess,
  toggleExtension,
  updateGameCommand,
} from './actions';
import { without, sortBy } from 'lodash';

export interface ExtensionsState {
  extensions: Partial<Record<Game, Extension[]>>;
  selectedExtensions?: string[];
  loading: number;
  entities?: Record<string, string[]>;
}

export const initialState: ExtensionsState = {
  extensions: {},
  loading: 0,
};

const _reducer = createReducer(
  initialState,
  on(loadExtensions, (state) => ({
    ...state,
    loading: state.loading + 1,
  })),
  on(loadExtensionsSuccess, (state, { game, extensions }) => ({
    ...state,
    loading: state.loading - 1,
    extensions: { ...state.extensions, [game]: extensions },
    selectedExtensions: extensions.map((e) => e.name),
    entities: getEntities(extensions),
  })),
  on(
    updateGameCommand,
    (
      state,
      { game, command: newCommand, newExtension: name, oldExtension }
    ) => {
      let tickExtension: string | null = null;
      let untickExtension: string | null = null;
      let extensions = upsertBy(
        state.extensions[game] ?? [],
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
        extensions: { ...state.extensions, [game]: extensions },
        selectedExtensions,
        entities,
      };
    }
  ),
  on(toggleExtension, (state, { extension }) => {
    const selectedExtensions = state.selectedExtensions.includes(extension)
      ? without(state.selectedExtensions, extension)
      : [...state.selectedExtensions, extension];
    return { ...state, selectedExtensions };
  })
);

export function extensionsReducer(state: ExtensionsState, action: Action) {
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

  for (const item of collection) {
    if (item[key] === needle) {
      found = true;
      const newItem = onFound(item);
      if (newItem !== null) {
        newCollection.push(onFound(item));
      }
    } else {
      newCollection.push(item);
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
      .filter((command) => command.attrs?.is_constructor)
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
  }, {} as Record<string, string[]>);
}

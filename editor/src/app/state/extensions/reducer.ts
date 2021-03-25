import { Action, createReducer, on } from '@ngrx/store';
import { Extension } from '../../models';
import {
  loadExtensions,
  loadExtensionsSuccess,
  toggleExtension,
  updateCommand,
} from './actions';
import { without, sortBy } from 'lodash';

export interface ExtensionsState {
  extensions?: Extension[];
  selectedExtensions?: string[];
  loading: boolean;
  entities?: Record<string, string[]>;
}

export const initialState: ExtensionsState = {
  loading: false,
};

const _reducer = createReducer(
  initialState,
  on(loadExtensions, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadExtensionsSuccess, (state, { extensions }) => ({
    ...state,
    loading: false,
    extensions,
    selectedExtensions: extensions.map((e) => e.name),
    entities: getEntities(extensions),
  })),
  on(
    updateCommand,
    (state, { command: newCommand, newExtension: name, oldExtension }) => {
      let tickExtension: string | null = null;
      let untickExtension: string | null = null;
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

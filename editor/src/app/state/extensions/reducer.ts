import { Action, createReducer, on } from '@ngrx/store';
import { Entity, Extension, Game } from '../../models';
import {
  loadExtensions,
  loadExtensionsSuccess,
  toggleExtension,
  updateGameCommand,
} from './actions';
import { without, sortBy, last } from 'lodash';

export interface GameState {
  extensions: Extension[];
  selectedExtensions?: string[];
  loading: boolean;
  entities?: Record<string, Entity[]>;
  lastUpdate?: number;
}
export interface ExtensionsState {
  games: Partial<Record<Game, GameState>>;
}

export const initialState: ExtensionsState = {
  games: {},
};

const _reducer = createReducer(
  initialState,
  on(loadExtensions, (state, { game }) =>
    updateState(state, game, {
      loading: true,
    })
  ),
  on(loadExtensionsSuccess, (state, { game, extensions, lastUpdate }) =>
    updateState(state, game, {
      extensions,
      lastUpdate,
      selectedExtensions: extensions.map((e) => e.name),
      entities: getEntities(extensions),
      loading: false,
    })
  ),
  on(
    updateGameCommand,
    (
      state,
      { game, command: newCommand, newExtension: name, oldExtension }
    ) => {
      const gameState: GameState = state.games[game] ?? {
        extensions: [],
        selectedExtensions: [],
        loading: false,
        entities: {},
      };
      let tickExtension: string | null = null;
      let untickExtension: string | null = null;
      let extensions = upsertBy(
        gameState.extensions,
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
            // remove previous collection if it is empty
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
          ? gameState.selectedExtensions.filter((s) => s !== untickExtension)
          : [...gameState.selectedExtensions];

      if (tickExtension !== null) {
        selectedExtensions.push(tickExtension);
        selectedExtensions.sort();
      }

      const entities = getEntities(extensions);

      return updateState(state, game, {
        extensions,
        selectedExtensions,
        entities,
      });
    }
  ),
  on(toggleExtension, (state, { game, extension }) => {
    const selectedExtensions = state.games[game]?.selectedExtensions ?? [];

    return updateState(state, game, {
      selectedExtensions: selectedExtensions.includes(extension)
        ? without(selectedExtensions, extension)
        : [...selectedExtensions, extension],
    });
  })
);

function updateState(
  state: ExtensionsState,
  game: Game,
  newState: Partial<GameState>
) {
  return {
    ...state,
    games: {
      ...state.games,
      [game]: { ...(state.games[game] ?? {}), ...newState },
    },
  };
}

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

function getEntities(extensions: Extension[]): Record<string, Entity[]> {
  const dynamicClasses = new Set<string>();
  const staticClasses = new Set<string>();

  return extensions.reduce((m, e) => {
    for (const command of e.commands) {
      if (command.attrs?.is_constructor) {
        const name = last(command.output)?.type;
        if (name) {
          dynamicClasses.add(name);
        }
      } else if (command.class) {
        staticClasses.add(command.class);
      }
    }
    const dynamicClassesArray = [...dynamicClasses];
    const staticClassesArray = [...staticClasses].filter(
      (name) => !dynamicClassesArray.includes(name)
    );
    (m[e.name] ??= []).push(
      ...dynamicClassesArray.map(
        (name) => ({ name, type: 'dynamic' } as Entity)
      ),
      ...staticClassesArray.map((name) => ({ name, type: 'static' } as Entity))
    );
    return m;
  }, {} as Record<string, Entity[]>);
}

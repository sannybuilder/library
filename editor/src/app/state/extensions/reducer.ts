import { Action, createReducer, on } from '@ngrx/store';
import {
  Command,
  Entity,
  Extension,
  Game,
  GameSupportInfo,
  SupportInfo,
  SupportLevel,
} from '../../models';
import {
  initSupportInfo,
  loadExtensions,
  loadExtensionsSuccess,
  updateGameCommands,
} from './actions';
import { sortBy, last } from 'lodash';

export interface GameState {
  extensions: Extension[];
  loading: boolean;
  entities?: Record<string, Entity[]>;
  lastUpdate?: number;
  supportInfo: SupportInfo;
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
      entities: getEntities(extensions),
      loading: false,
    })
  ),
  on(updateGameCommands, (state, { game, batch }) => {
    const extensions: Extension[] = batch.reduce(
      (memo, { command: newCommand, newExtension: name, oldExtension }) => {
        memo = upsertBy(
          memo,
          'name',
          name,
          (e) => ({
            ...e,
            commands: upsertBy(
              e.commands,
              'id',
              newCommand.id,
              () => (newCommand.id && newCommand.name ? newCommand : null),
              () => (newCommand.id && newCommand.name ? newCommand : null)
            ),
          }),
          () => ({
            name,
            commands: [newCommand],
          })
        );

        if (name === oldExtension) {
          return memo;
        }

        // remove from previous collection
        return upsertBy(memo, 'name', oldExtension, (e) => {
          const commands = upsertBy(e.commands, 'id', newCommand.id);
          if (!commands.length) {
            // remove previous collection if it is empty
            return null;
          }
          return {
            ...e,
            commands,
          };
        });
      },
      state.games[game]?.extensions ?? []
    );

    const entities = getEntities(extensions);
    return updateState(state, game, {
      extensions,
      entities,
    });
  }),
  on(initSupportInfo, (state) => {
    return Object.entries(state.games).reduce((s, [game, { extensions }]) => {
      return updateState(s, game as Game, {
        supportInfo: getSupportInfo(extensions, state.games, game as Game),
      });
    }, state);
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
  return extensions.reduce((m, e) => {
    const dynamicClasses = new Set<string>();
    const staticClasses = new Set<string>();
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
    const dynamicClassesArray = [...dynamicClasses].sort();
    const staticClassesArray = [...staticClasses]
      .filter((name) => !dynamicClassesArray.includes(name))
      .sort();
    (m[e.name] ??= []).push(
      ...dynamicClassesArray.map(
        (name) => ({ name, type: 'dynamic' } as Entity)
      ),
      ...staticClassesArray.map((name) => ({ name, type: 'static' } as Entity))
    );
    return m;
  }, {} as Record<string, Entity[]>);
}

function getSupportInfo(
  extensions: Extension[],
  state: ExtensionsState['games'],
  game: Game
): SupportInfo {
  return extensions.reduce((m, { name, commands }) => {
    m[name] = commands.reduce((m2, command) => {
      m2[command.id] = Object.keys(state).map((v3: Game) => ({
        game: v3,
        level: getSupportLevel(
          game === v3
            ? command
            : getCommand(state[v3].extensions, name, command),
          command
        ),
      }));
      return m2;
    }, {} as Record<string, GameSupportInfo[]>);
    return m;
  }, {} as SupportInfo);
}

function getCommand(
  extensions: Extension[],
  extensionName: string,
  command: Command
) {
  const extension = extensions?.find((e) => e.name === extensionName);
  return extension?.commands?.find((c) => c.id === command.id);
}

function getSupportLevel(command: Command, otherCommand: Command) {
  // no command with the same id
  if (!command) {
    return SupportLevel.DoesNotExist;
  }

  // same ids, but different names (e.g. 03E2)
  if (command.name !== otherCommand.name) {
    return SupportLevel.SupportedDiffParams;
  }

  const attrs = command.attrs || {};
  const otherAttrs = otherCommand.attrs || {};

  const { is_nop, is_unsupported } = attrs;
  if (is_unsupported) {
    return SupportLevel.Unsupported;
  }
  if (is_nop) {
    return SupportLevel.Nop;
  }
  if (
    otherCommand.num_params !== command.num_params &&
    !otherAttrs.is_unsupported
  ) {
    return SupportLevel.SupportedDiffParams;
  }
  return SupportLevel.Supported;
}

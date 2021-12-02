import { createReducer, on } from '@ngrx/store';
import {
  ClassMeta,
  Command,
  DEFAULT_EXTENSION,
  Entity,
  Extension,
  Game,
  GameSupportInfo,
  SupportInfo,
  SupportLevel,
  GamePlatforms,
  GameVersions,
} from '../../models';
import {
  initSupportInfo,
  loadExtensions,
  loadExtensionsSuccess,
  updateGameCommands,
} from './actions';
import { sortBy, last, orderBy, pick } from 'lodash';
import {
  getGameVariations,
  isPlatformMatching,
  isVersionMatching,
} from '../../utils';

export interface GameState {
  extensions: Extension[];
  loading: boolean;
  entities?: Record<string, Entity[]>;
  lastUpdate?: number;
  version?: string;
  supportInfo: SupportInfo;
  classesMeta: ClassMeta[];
}
export interface ExtensionsState {
  games: Partial<Record<Game, GameState>>;
}

export const initialState: ExtensionsState = {
  games: {},
};

export const extensionsReducer = createReducer(
  initialState,
  on(loadExtensions, (state, { game }) =>
    updateState(state, game, {
      loading: true,
    })
  ),
  on(
    loadExtensionsSuccess,
    (state, { game, extensions, version, lastUpdate, classes }) => {
      const games = [game, ...getGameVariations(game)];

      const filterByEdition = (extensions: Extension[], g: Game) =>
        extensions
          .map((e) => {
            return {
              ...e,
              commands: e.commands.filter(
                (c) =>
                  isPlatformMatching(c, GamePlatforms[g]) &&
                  isVersionMatching(c, GameVersions[g])
              ),
            };
          })
          .filter((e) => e.commands.length > 0);

      return games.reduce((m, v) => {
        const filtered = filterByEdition(extensions, v);
        return updateState(m, v, {
          extensions: orderBy(filtered, (e) =>
            e.name === DEFAULT_EXTENSION ? -1 : 1
          ),
          lastUpdate,
          version,
          entities: getEntities(filtered, classes),
          loading: false,
          classesMeta: classes,
        });
      }, state);
    }
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

    const entities = getEntities(extensions, state.games[game]?.classesMeta);
    return updateState(state, game, {
      extensions,
      entities,
    });
  }),
  on(initSupportInfo, (state, { game }) => {
    return updateState(state, game as Game, {
      supportInfo: getSupportInfo(
        state.games[game]!.extensions,
        {
          [Game.GTA3]: state.games[Game.GTA3],
          [Game.VC]: state.games[Game.VC],
          [Game.SA]: state.games[Game.SA],
          [Game.gta3_mobile]: state.games[Game.gta3_mobile],
          [Game.vc_mobile]: state.games[Game.vc_mobile],
          [Game.sa_mobile]: state.games[Game.sa_mobile],
          [Game.gta3_unreal]: state.games[Game.gta3_unreal],
          [Game.vc_unreal]: state.games[Game.vc_unreal],
          [Game.sa_unreal]: state.games[Game.sa_unreal],
        },
        game as Game
      ),
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
        newCollection.push(newItem);
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

function getEntities(
  extensions: Extension[],
  classesMeta: ClassMeta[] | undefined
): Record<string, Entity[]> {
  const defaultEntities =
    extensions
      .find((e) => e.name === DEFAULT_EXTENSION)
      ?.commands.reduce((m, command: Command) => {
        if (command.attrs?.is_constructor) {
          const name = last(command.output)?.type;
          if (name) {
            m.add(name);
          }
        }
        return m;
      }, new Set<string>()) ?? new Set();

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
        if (
          defaultEntities.has(command.class) ||
          classesMeta?.find((m) => m.name === command.class && m.constructable)
        ) {
          dynamicClasses.add(command.class);
        } else {
          staticClasses.add(command.class);
        }
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
      m2[command.id] = (Object.keys(state) as Game[]).map((v3) => ({
        game: v3,
        level: getSupportLevel(
          game === v3
            ? command
            : getCommand(state[v3]?.extensions, name, command),
          command,
          game,
          v3
        ),
      }));
      return m2;
    }, {} as Record<string, GameSupportInfo[]>);
    return m;
  }, {} as SupportInfo);
}

function getCommand(
  extensions: Extension[] | undefined,
  extensionName: string,
  command: Command
): Command | undefined {
  const extension = extensions?.find((e) => e.name === extensionName);
  return extension?.commands?.find((c) => c.id === command.id);
}

function getSupportLevel(
  command: Command | undefined,
  otherCommand: Command,
  game: Game,
  otherGame: Game
) {
  // no command with the same id
  if (!command) {
    return SupportLevel.DoesNotExist;
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

  // same ids, but different names (e.g. 03E2)
  if (command.name !== otherCommand.name) {
    return SupportLevel.SupportedDiffParams;
  }

  if (
    otherCommand.num_params !== command.num_params &&
    !otherAttrs.is_unsupported
  ) {
    return SupportLevel.SupportedDiffParams;
  }

  // ugly workaround for Garage commands in SA
  // they have the same names and number of parameters
  // but unlike their GTA3/VC predecessors they are all static
  if (
    command.class === 'Garage' &&
    game !== otherGame &&
    [game, otherGame].includes(Game.SA)
  ) {
    return SupportLevel.SupportedDiffParams;
  }

  return SupportLevel.Supported;
}

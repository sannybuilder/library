import { createReducer, on } from '@ngrx/store';
import {
  ClassMeta,
  Command,
  DEFAULT_EXTENSION,
  Entity,
  Extension,
  Game,
  SupportInfo,
  ViewContext,
} from '../../models';
import {
  initSupportInfo,
  loadExtensions,
  loadExtensionsError,
  loadExtensionsSuccess,
  loadSupportInfo,
  markCommandsToDelete,
  updateGameCommands,
} from './actions';
import { sortBy, orderBy } from 'lodash';
import { matchArrays, getEntities } from '../../utils';
import { getSupportInfo } from '../../utils/support-info';

export interface GameState {
  extensions: Extension[];
  loading: boolean;
  loadingError?: boolean;
  entities?: Record<string, Entity[]>;
  lastUpdate?: number;
  version?: string;
  supportInfo: SupportInfo;
  classesMeta: ClassMeta[];
  commandsToDelete: string[];
}
export interface ExtensionsState {
  games: Partial<Record<Game, GameState>>;
}

export const initialState: ExtensionsState = {
  games: {},
};

const sortExtensions = (extensions: Extension[]) =>
  orderBy(extensions, (e) => (e.name === DEFAULT_EXTENSION ? -1 : 1));

export const extensionsReducer = createReducer(
  initialState,
  on(loadExtensions, (state, { game }) =>
    updateState(state, game, {
      loading: true,
      loadingError: false,
    })
  ),
  on(
    loadExtensionsSuccess,
    (state, { game, extensions, version, lastUpdate, classes, viewContext }) => {
      return updateState(state, game, {
        extensions: sortExtensions(extensions),
        entities: getEntities(extensions, classes, game, viewContext),
        lastUpdate,
        version,
        loading: false,
        loadingError: false,
        classesMeta: classes,
      });
    }
  ),
  on(loadExtensionsError, (state, { game }) =>
    updateState(state, game, { loading: false, loadingError: true })
  ),
  on(updateGameCommands, (state, { game, batch }) => {
    const extensions: Extension[] = batch.reduce(
      (
        memo,
        {
          command: newCommand,
          newExtension: name,
          oldExtension,
          ignoreVersionAndPlatform,
        }
      ) => {
        memo = upsertBy(
          memo,
          (extension) => extension.name === name,
          'name',
          (e) => ({
            ...e,
            commands: upsertBy(
              e.commands,
              (command) =>
                commandMatcher(command, newCommand, ignoreVersionAndPlatform),
              'id',
              (c) =>
                state.games[game]?.commandsToDelete?.includes(newCommand.name)
                  ? null
                  : ignoreVersionAndPlatform
                  ? {
                      ...ensureOverload(newCommand, c),
                      id: c.id,
                      platforms: c.platforms,
                      versions: c.versions,
                    }
                  : ensureOverload(newCommand, c),

              () =>
                state.games[game]?.commandsToDelete?.includes(newCommand.name)
                  ? null
                  : newCommand
            ),
          }),
          () => ({ name, commands: [newCommand] })
        );

        if (name === oldExtension) {
          return memo;
        }

        // remove from previous collection
        return upsertBy(
          memo,
          (extension) => extension.name === oldExtension,
          'name',
          (e) => {
            const commands = upsertBy(
              e.commands,
              (command) =>
                commandMatcher(command, newCommand, ignoreVersionAndPlatform),
              'id'
            );
            if (!commands.length) {
              // remove previous collection if it is empty
              return null;
            }
            return { ...e, commands };
          }
        );
      },
      state.games[game]?.extensions ?? []
    );

    const entities = getEntities(extensions, state.games[game]?.classesMeta, game, ViewContext.Script);
    return updateState(state, game, {
      extensions: sortExtensions(extensions),
      entities,
      commandsToDelete: [],
    });
  }),
  on(loadSupportInfo, (state, { data }) => {
    return Object.entries(data)
      .filter(([game]) => Game[game as Game])
      .reduce((memo, [game, supportInfo]) => {
        return updateState(memo, game as Game, { supportInfo });
      }, state);
  }),
  on(initSupportInfo, (state, { game }) => {
    return updateState(state, game as Game, {
      supportInfo: getSupportInfo(
        state.games[game]!.extensions,
        Object.values(Game).reduce((m, v) => {
          m[v] = state.games[v]!;
          return m;
        }, {} as Record<Game, GameState>),
        game as Game
      ),
    });
  }),
  on(markCommandsToDelete, (state, { names, game }) => {
    return updateState(state, game, {
      commandsToDelete: names,
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
  matcher: (element: T) => boolean,
  sortKey: Key,
  onFound: (element: T) => T | null = () => null,
  onDefault: () => T | null = () => null
): T[] {
  let found = false;
  const newCollection: T[] = [];

  for (const item of collection) {
    if (matcher(item)) {
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
      return sortBy(newCollection, sortKey);
    }
  }

  return newCollection;
}

function commandMatcher(
  a: Command,
  b: Command,
  ignoreVersionAndPlatform: boolean
) {
  const matches = a.id && b.id ? a.id === b.id : a.name === b.name;
  if (ignoreVersionAndPlatform) {
    return matches;
  }
  return (
    matches &&
    matchArrays(a.versions, b.versions) &&
    matchArrays(a.platforms, b.platforms)
  );
}

function ensureOverload(newCommand: Command, oldCommand: Command): Command {
  return {
    ...newCommand,
    attrs: {
      ...(newCommand.attrs ?? {}),
      is_overload: oldCommand.attrs?.is_overload,
    },
  };
}

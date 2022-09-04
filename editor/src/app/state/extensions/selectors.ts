import { createFeatureSelector, createSelector } from '@ngrx/store';
import { uniqBy } from 'lodash';
import {
  ClassMeta,
  Command,
  DEFAULT_EXTENSION,
  Extension,
  Game,
  SupportInfo,
} from '../../models';
import { game } from '../game/selectors';
import { ExtensionsState, GameState } from './reducer';

export const extensionsState =
  createFeatureSelector<ExtensionsState>('extensions');

export const state = createSelector(
  extensionsState,
  game,
  (state: ExtensionsState, game: Game | undefined) =>
    game ? state.games[game] : undefined
);

export const extensions = createSelector(
  state,
  (state: GameState | undefined) => state?.extensions
);

export const entities = createSelector(
  state,
  (state: GameState | undefined) => state?.entities
);

export const gameExtensions = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.extensions ?? []
);

export const extensionNames = createSelector(
  extensions,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const extensionCommands = createSelector(
  extensions,
  (extensions: Extension[] | undefined, props: { extension: string }) =>
    extensions?.find((e) => e.name === props.extension)?.commands
);

export const extensionCommand = createSelector(
  extensions,
  (
    extensions: Extension[] | undefined,
    props: { extension: string; id: string }
  ) =>
    extensions
      ?.find((e) => e.name === props.extension)
      ?.commands?.find((c) => (c.id || c.name) === props.id)
);

export const loading = createSelector(
  state,
  (state: GameState | undefined) => state?.loading
);

export const extensionEntities = createSelector(
  state,
  (state: GameState | undefined, props: { extension: string }) =>
    state?.entities?.[props.extension] ?? []
);

export const lastUpdate = createSelector(
  state,
  (state: GameState | undefined) => state?.lastUpdate
);

export const supportInfo = createSelector(
  state,
  (state: GameState | undefined) => state?.supportInfo
);

export const commandSupportInfo = createSelector(
  supportInfo,
  (
    supportInfo: SupportInfo | undefined,
    props: { command: Command; extension: string }
  ) => {
    const extension = supportInfo?.[props.extension];
    if (!extension) {
      return;
    }
    return extension[props.command.id || props.command.name];
  }
);

export const commandRelated = createSelector(
  extensions,
  (
    extensions: Extension[] | undefined,
    props: { extension: string; command: Command }
  ) => {
    const commands = extensions?.find(
      (e) => e.name === props.extension
    )?.commands;

    if (!commands) {
      return;
    }

    const { id, name, class: className, member, attrs } = props.command;
    const referenced =
      commands.filter((c) => id && c.short_desc?.includes(id)) ?? [];

    const overloads = attrs?.is_overload
      ? commands.filter((c) => {
          const haveSameId = c.id === id;
          const haveSameName = c.name === name;
          const haveSameClass =
            c.class && c.member && c.class === className && c.member === member;

          return (!id || !haveSameId) && (haveSameName || haveSameClass);
        })
      : [];

    const get_set_pairs = [];
    if (name?.startsWith('GET_')) {
      const setter = name.replace('GET_', 'SET_');
      const pair = commands.find((c) => c.name === setter);
      if (pair) {
        get_set_pairs.push(pair);
      }
    } else if (name?.startsWith('SET_')) {
      const getter = name.replace('SET_', 'GET_');
      const pair = commands.find((c) => c.name === getter);
      if (pair) {
        get_set_pairs.push(pair);
      }
    }

    return uniqBy([...referenced, ...overloads, ...get_set_pairs], 'id');
  }
);

export const gameVersion = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.version
);

export const version = createSelector(
  state,
  (state: GameState | undefined) => state?.version
);

export const classOrigin = createSelector(
  extensions,
  (extensions: Extension[] | undefined, props: { className: string }) =>
    extensions?.find((e) => e.commands.some((c) => c.class === props.className))
      ?.name ?? DEFAULT_EXTENSION
);

export const gameClassesMeta = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.classesMeta ?? []
);

export const classMeta = createSelector(
  gameClassesMeta,
  (classesMeta: ClassMeta[], props: { game: Game; className: string }) =>
    classesMeta.find((m) => m.name === props.className)
);

export const classesMeta = createSelector(
  state,
  (state: GameState | undefined) => state?.classesMeta
);

export const commandsToDelete = createSelector(
  state,
  (state: GameState | undefined) => state?.commandsToDelete
);

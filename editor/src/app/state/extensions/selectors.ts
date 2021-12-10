import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getGameVariations,
  isPlatformMatching,
  isVersionMatching,
} from '../../utils';
import {
  ClassMeta,
  Command,
  DEFAULT_EXTENSION,
  Extension,
  Game,
  Platform,
  SupportInfo,
  Version,
} from '../../models';
import { game } from '../game/selectors';
import { selectedPlatforms, selectedVersions } from '../version/selectors';
import { commandMatcher, ExtensionsState, GameState } from './reducer';
import { map, mapKeys, mergeWith, unionWith } from 'lodash';

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
  selectedPlatforms,
  selectedVersions,
  (
    state: GameState | undefined,
    selectedPlatforms: Platform[] | undefined,
    selectedVersions: Version[] | undefined
  ) => {
    const extensions = state?.extensions ?? [];

    const filtered = extensions
      .map((e) => {
        return {
          ...e,
          commands: e.commands.filter(
            (c) =>
              isPlatformMatching(c, selectedPlatforms ?? [Platform.Any]) &&
              isVersionMatching(c, selectedVersions ?? [Version.Any])
          ),
        };
      })
      .filter((e) => e.commands.length > 0);

    return filtered.length ? filtered : undefined;
  }
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

export const getAllEditionsExtensions = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) => {
    const games = [props.game, ...getGameVariations(props.game)];

    return games.reduce((m, v) => {
      const extensions = state.games[v]?.extensions ?? [];

      return map(
        mergeWith(
          {},
          mapKeys(m, (v) => v.name),
          mapKeys(extensions, (v) => v.name),
          (extension1, extension2) => {
            return mergeWith(
              {},
              extension1,
              extension2,
              (objValue, srcValue, key) => {
                if (key === 'commands') {
                  return unionWith(
                    objValue,
                    srcValue,
                    (c1: Command, c2: Command) => commandMatcher(c1, c2)
                  );
                }
                return undefined;
              }
            );
          }
        )
      );
    }, [] as Extension[]);
  }
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
      ?.commands?.find((c) => c.id === props.id)
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
  ) => supportInfo?.[props.extension]?.[props.command.id]
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
    const referenced = commands.filter((c) => c.short_desc?.includes(id)) ?? [];

    const overloads = attrs?.is_overload
      ? commands.filter((c) => {
          return (
            c.id !== id &&
            (c.name === name ||
              (c.class &&
                c.member &&
                c.class === className &&
                c.member === member))
          );
        })
      : [];

    return [...referenced, ...overloads];
  }
);

export const hasAnyLoadingInProgress = createSelector(
  extensionsState,
  (state: ExtensionsState) => Object.values(state.games).some((s) => s?.loading)
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

export const classesMeta = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.classesMeta ?? []
);

export const classMeta = createSelector(
  classesMeta,
  (classesMeta: ClassMeta[], props: { game: Game; className: string }) =>
    classesMeta.find((m) => m.name === props.className)
);

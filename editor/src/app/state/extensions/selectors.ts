import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Command, Extension, Game, SupportInfo } from '../../models';
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
    props: { extension: string; command: Command }
  ) =>
    extensions
      ?.find((e) => e.name === props.extension)
      ?.commands?.find((c) => c.id === props.command.id)
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

export const hasAnyLoadingInProgress = createSelector(
  extensionsState,
  (state: ExtensionsState) => Object.values(state.games).some((s) => s?.loading)
);

export const gameVersion = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.version
);

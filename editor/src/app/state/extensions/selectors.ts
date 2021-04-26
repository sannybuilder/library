import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension, Game } from '../../models';
import { game } from '../game/selectors';
import { ExtensionsState, GameState } from './reducer';

export const gamesState = createFeatureSelector('extensions');

export const state = createSelector(
  gamesState,
  game,
  (games: ExtensionsState, game: Game) => games.games[game] ?? {}
);

export const extensions = createSelector(
  state,
  (state: GameState) => state.extensions
);

export const entities = createSelector(
  state,
  (state: GameState) => state.entities
);

export const gameExtensions = createSelector(
  gamesState,
  (games: ExtensionsState, props: { game: Game }) =>
    games.games[props.game]?.extensions ?? []
);

export const extensionNames = createSelector(
  extensions,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const extensionCommands = createSelector(
  extensions,
  (extensions: Extension[], props: { extension: string }) =>
    extensions.find((e) => e.name === props.extension)?.commands
);

export const loading = createSelector(
  state,
  (state: GameState) => state.loading
);

export const extensionEntities = createSelector(
  state,
  (state: GameState, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

export const lastUpdate = createSelector(
  state,
  (state: GameState) => state.lastUpdate
);

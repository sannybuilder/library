import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension, Game } from '../../models';
import { game } from '../ui/selectors';
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

export const extensionNames = createSelector(
  extensions,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const loading = createSelector(
  state,
  (state: GameState) => state.loading
);

export const selectedExtensions = createSelector(
  state,
  (state: GameState, props: { extension: string }) =>
    state.selectedExtensions.includes(props.extension)
);

export const entities = createSelector(
  state,
  (state: GameState, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

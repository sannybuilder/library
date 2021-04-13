import { createFeatureSelector, createSelector } from '@ngrx/store';
import { flatMap, uniq } from 'lodash';
import { search } from '../../fusejs/fusejs';
import { Attribute, Command, Extension, Game } from '../../models';
import { game } from '../game/selectors';
import {
  searchTerm,
  selectedFiltersExcept,
  selectedFiltersOnly,
} from '../ui/selectors';
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
  state,
  (extensions: Extension[], props: { extension: string }) =>
    extensions.find((e) => e.name === props.extension)?.commands
);

export const loading = createSelector(
  state,
  (state: GameState) => state.loading
);

export const selectedExtensions = createSelector(
  state,
  (state: GameState) => state.selectedExtensions
);

export const isExtensionSelected = createSelector(
  selectedExtensions,
  (selectedExtensions: string[], props: { extension: string }) =>
    selectedExtensions?.includes(props.extension)
);

export const entities = createSelector(
  state,
  (state: GameState, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

export const lastUpdate = createSelector(
  state,
  (state: GameState) => state.lastUpdate
);

// todo: move to ui
export const classNamesForSelectedExtensions = createSelector(
  extensions,
  selectedExtensions,
  (extensions, selectedExtensions) => {
    const selected = extensions?.filter((_, i) => selectedExtensions[i]);

    return (
      selected &&
      uniq(
        flatMap(selected, ({ commands }) =>
          commands.map((command) => command.class || '(no class)')
        )
      )
    );
  }
);

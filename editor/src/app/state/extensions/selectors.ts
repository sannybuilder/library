import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension, Game } from '../../models';
import { game } from '../ui/selectors';
import { ExtensionsState } from './reducer';

export const state = createFeatureSelector('extensions');

export const extensions = createSelector(
  state,
  game,
  (state: ExtensionsState, game: Game) => state.extensions?.[game]
);

export const extensionNames = createSelector(
  extensions,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const loading = createSelector(
  state,
  (state: ExtensionsState) => state.loading > 0
);

export const selectedExtensions = createSelector(
  state,
  (state: ExtensionsState, props: { extension: string }) =>
    state.selectedExtensions.includes(props.extension)
);

export const entities = createSelector(
  state,
  (state: ExtensionsState, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

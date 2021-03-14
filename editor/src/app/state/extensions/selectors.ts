import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension } from '../../models';
import { ExtensionsState } from './reducer';

export const state = createFeatureSelector('extensions');

export const extensions = createSelector(
  state,
  (state: ExtensionsState) => state.extensions
);

export const extensionNames = createSelector(
  extensions,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const loading = createSelector(
  state,
  (state: ExtensionsState) => state.loading
);

export const lastUpdate = createSelector(
  state,
  (state: ExtensionsState) => state.lastUpdate
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

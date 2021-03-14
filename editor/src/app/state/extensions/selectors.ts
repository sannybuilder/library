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

export const error = createSelector(
  state,
  (state: ExtensionsState) => state.error
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

export const selectedFiltersOnly = createSelector(
  state,
  (state: ExtensionsState) => state.selectedFiltersOnly
);

export const selectedFiltersExcept = createSelector(
  state,
  (state: ExtensionsState) => state.selectedFiltersExcept
);

export const isFilterSelectedOnly = createSelector(
  selectedFiltersOnly,
  (selectedFilters: string[], props: { filter: string }) =>
    selectedFilters.includes(props.filter)
);

export const isFilterSelectedExcept = createSelector(
  selectedFiltersExcept,
  (selectedFilters: string[], props: { filter: string }) =>
    selectedFilters.includes(props.filter)
);

export const searchTerm = createSelector(
  state,
  (state: ExtensionsState) => state.searchTerm
);

export const displaySearchBar = createSelector(
  state,
  (state: ExtensionsState) => state.displaySearchBar
);

export const displayLastUpdated = createSelector(
  state,
  (state: ExtensionsState) => state.displayLastUpdated
);

export const commandToDisplayOrEdit = createSelector(
  state,
  (state: ExtensionsState) => ({
    command: state.commandToDisplayOrEdit,
    extension: state.extensionToDisplayOrEdit,
    viewMode: state.viewMode,
  })
);

export const opcodeOnLoad = createSelector(state, (state: ExtensionsState) => ({
  opcode: state.opcodeOnLoad,
  extension: state.extensionOnLoad,
}));

export const game = createSelector(
  state,
  (state: ExtensionsState) => state.game
);

export const entities = createSelector(
  state,
  (state: ExtensionsState, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

export const changesCount = createSelector(
  state,
  (state: ExtensionsState) => state.changesCount
);

export const snippets = createSelector(
  state,
  (state: ExtensionsState, props: { extension: string; opcode: string }) => {
    return (
      state.extensionSnippets?.[props.extension]?.[props.opcode]?.snippet ?? ''
    );
  }
);

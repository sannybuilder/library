import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension } from '../models';
import { RootState } from './reducer';

export const state = createFeatureSelector('root');

export const extensions = createSelector(
  state,
  (state: RootState) => state.extensions
);

export const extensionNames = createSelector(
  extensions,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const error = createSelector(state, (state: RootState) => state.error);

export const loading = createSelector(
  state,
  (state: RootState) => state.loading
);

export const lastUpdate = createSelector(
  state,
  (state: RootState) => state.lastUpdate
);

export const selectedExtensions = createSelector(
  state,
  (state: RootState, props: { extension: string }) =>
    state.selectedExtensions.includes(props.extension)
);

export const selectedFiltersOnly = createSelector(
  state,
  (state: RootState) => state.selectedFiltersOnly
);

export const selectedFiltersExcept = createSelector(
  state,
  (state: RootState) => state.selectedFiltersExcept
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
  (state: RootState) => state.searchTerm
);

export const displaySearchBar = createSelector(
  state,
  (state: RootState) => state.displaySearchBar
);

export const displayLastUpdated = createSelector(
  state,
  (state: RootState) => state.displayLastUpdated
);

export const commandToDisplayOrEdit = createSelector(
  state,
  (state: RootState) => ({
    command: state.commandToDisplayOrEdit,
    extension: state.extensionToDisplayOrEdit,
    viewMode: state.viewMode,
  })
);

export const opcodeOnLoad = createSelector(state, (state: RootState) => ({
  opcode: state.opcodeOnLoad,
  extension: state.extensionOnLoad,
}));

export const game = createSelector(state, (state: RootState) => state.game);

export const entities = createSelector(
  state,
  (state: RootState, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

export const changesCount = createSelector(
  state,
  (state: RootState) => state.changesCount
);

export const snippets = createSelector(
  state,
  (state: RootState, props: { extension: string; opcode: string }) => {
    return state.extensionSnippets?.[props.extension]?.[props.opcode] ?? '';
  }
);

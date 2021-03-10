import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension } from '../models';
import { RootState } from './reducer';

export const state = createFeatureSelector('root');

export const extensionsSelector = createSelector(
  state,
  (state: RootState) => state.extensions
);

export const extensionNamesSelector = createSelector(
  extensionsSelector,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const errorSelector = createSelector(
  state,
  (state: RootState) => state.error
);

export const loadingSelector = createSelector(
  state,
  (state: RootState) => state.loading
);

export const lastUpdateSelector = createSelector(
  state,
  (state: RootState) => state.lastUpdate
);

export const selectedExtensionsSelector = createSelector(
  state,
  (state: RootState, props: { extension: string }) =>
    state.selectedExtensions.includes(props.extension)
);

export const selectedFiltersOnlySelector = createSelector(
  state,
  (state: RootState) => state.selectedFiltersOnly
);

export const selectedFiltersExceptSelector = createSelector(
  state,
  (state: RootState) => state.selectedFiltersExcept
);

export const isFilterSelectedOnlySelector = createSelector(
  selectedFiltersOnlySelector,
  (selectedFilters: string[], props: { filter: string }) =>
    selectedFilters.includes(props.filter)
);

export const isFilterSelectedExceptSelector = createSelector(
  selectedFiltersExceptSelector,
  (selectedFilters: string[], props: { filter: string }) =>
    selectedFilters.includes(props.filter)
);

export const searchTermSelector = createSelector(
  state,
  (state: RootState) => state.searchTerm
);

export const displaySearchBarSelector = createSelector(
  state,
  (state: RootState) => state.displaySearchBar
);

export const displayLastUpdatedSelector = createSelector(
  state,
  (state: RootState) => state.displayLastUpdated
);

export const commandToDisplayOrEditSelector = createSelector(
  state,
  (state: RootState) => ({
    command: state.commandToDisplayOrEdit,
    extension: state.extensionToDisplayOrEdit,
    viewMode: state.viewMode,
  })
);

export const opcodeOnLoadSelector = createSelector(
  state,
  (state: RootState) => ({
    opcode: state.opcodeOnLoad,
    extension: state.extensionOnLoad,
  })
);

export const gameSelector = createSelector(
  state,
  (state: RootState) => state.game
);

export const entitiesSelector = createSelector(
  state,
  (state: RootState, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

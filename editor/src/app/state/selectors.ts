import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension } from '../models';
import { State } from './reducer';

export const root = createFeatureSelector('root');

export const extensionsSelector = createSelector(
  root,
  (state: State) => state.extensions
);

export const extensionNamesSelector = createSelector(
  extensionsSelector,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const errorSelector = createSelector(
  root,
  (state: State) => state.error
);

export const loadingSelector = createSelector(
  root,
  (state: State) => state.loading
);

export const lastUpdateSelector = createSelector(
  root,
  (state: State) => state.lastUpdate
);

export const selectedExtensionsSelector = createSelector(
  root,
  (state: State, props: { extension: string }) =>
    state.selectedExtensions.includes(props.extension)
);

export const selectedFiltersOnlySelector = createSelector(
  root,
  (state: State) => state.selectedFiltersOnly
);

export const selectedFiltersExceptSelector = createSelector(
  root,
  (state: State) => state.selectedFiltersExcept
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
  root,
  (state: State) => state.searchTerm
);

export const displaySearchBarSelector = createSelector(
  root,
  (state: State) => state.displaySearchBar
);

export const displayLastUpdatedSelector = createSelector(
  root,
  (state: State) => state.displayLastUpdated
);

export const commandToDisplayOrEditSelector = createSelector(
  root,
  (state: State) => ({
    command: state.commandToDisplayOrEdit,
    extension: state.extensionToDisplayOrEdit,
    viewMode: state.viewMode,
  })
);

export const opcodeOnLoadSelector = createSelector(root, (state: State) => ({
  opcode: state.opcodeOnLoad,
  extension: state.extensionOnLoad,
}));

export const gameSelector = createSelector(root, (state: State) => state.game);

export const entitiesSelector = createSelector(
  root,
  (state: State, props: { extension: string }) =>
    state.entities?.[props.extension] ?? []
);

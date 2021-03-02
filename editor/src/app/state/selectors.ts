import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Extension } from '../models';
import { State } from './reducer';

export const root = createFeatureSelector('root');

export const extensionsSelector = createSelector(
  root,
  (state: State) => state.extensions
);

export const errorSelector = createSelector(
  root,
  (state: State) => state.error
);

export const editCommandSelector = createSelector(
  root,
  (state: State) => state.editCommand
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

export const selectedFiltersSelector = createSelector(
  root,
  (state: State) => state.selectedFilters
);

export const isFilterSelectedSelector = createSelector(
  selectedFiltersSelector,
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

export const entitiesSelector = createSelector(
  extensionsSelector,
  (extensions: Extension[], props: { extension: string }) => {
    const e = extensions.find((e) => e.name === props.extension);
    if (!e) {
      return [];
    }
    const set = e.commands
      .filter((command) => command.attrs.is_constructor)
      .reduce((entities, command) => {
        const last = command.output[command.output.length - 1];
        if (!last) {
          return [];
        }
        entities.add(last.type);
        return entities;
      }, new Set());

    return [...set];
  }
);

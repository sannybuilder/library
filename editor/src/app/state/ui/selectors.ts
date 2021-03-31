import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Command, SupportInfo } from '../../models';
import { UiState } from './reducer';

export const state = createFeatureSelector('ui');

export const selectedFiltersOnly = createSelector(
  state,
  (state: UiState) => state.selectedFiltersOnly
);

export const selectedFiltersExcept = createSelector(
  state,
  (state: UiState) => state.selectedFiltersExcept
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
  (state: UiState) => state.searchTerm
);

export const displaySearchBar = createSelector(
  state,
  (state: UiState) => state.displaySearchBar
);

export const displayLastUpdated = createSelector(
  state,
  (state: UiState) => state.displayLastUpdated
);

export const commandToDisplayOrEdit = createSelector(
  state,
  (state: UiState) => ({
    command: state.commandToDisplayOrEdit,
    extension: state.extensionToDisplayOrEdit,
    viewMode: state.viewMode,
  })
);

export const snippetToDisplayOrEdit = createSelector(
  state,
  (state: UiState) => state.snippetToDisplayOrEdit
);

export const opcodeOnLoad = createSelector(state, (state: UiState) => ({
  opcode: state.opcodeOnLoad,
  extension: state.extensionOnLoad,
}));

export const game = createSelector(state, (state: UiState) => state.game);

export const supportInfo = createSelector(
  state,
  (state: UiState) => state.supportInfo
);

export const commandSupportInfo = createSelector(
  supportInfo,
  (supportInfo: SupportInfo, props: { command: Command; extension: string }) =>
    supportInfo?.[props.extension]?.[props.command.id]
);

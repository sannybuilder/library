import { Action, createReducer, on } from '@ngrx/store';
import { Command, ViewMode, Attribute } from '../../models';
import {
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  toggleCommandListElements,
  toggleFilter,
  updateSearchTerm,
  displayOrEditSnippet,
  changePage,
  resetFilters,
} from './actions';
import { without } from 'lodash';
import { onListEnter } from '../game/actions';

export interface UiState {
  searchTerm?: string;
  displaySearchBar: boolean;
  displayLastUpdated: boolean;
  selectedExtensions?: string[];
  selectedFiltersOnly: Attribute[];
  selectedFiltersExcept: Attribute[];
  commandToDisplayOrEdit?: Command;
  extensionToDisplayOrEdit?: string;
  snippetToDisplayOrEdit?: string;
  viewMode: ViewMode;
  opcodeOnLoad?: string;
  extensionOnLoad?: string;
  currentPage: number | 'all';
}

const defaultFilterState = {
  searchTerm: '',
  selectedFiltersOnly: [] as Attribute[],
  selectedFiltersExcept: ['is_nop', 'is_unsupported'] as Attribute[],
};

export const initialState: UiState = {
  ...defaultFilterState,
  displayLastUpdated: false,
  displaySearchBar: false,
  viewMode: ViewMode.None,
  currentPage: 1,
};

const _reducer = createReducer(
  initialState,
  on(toggleFilter, (state, { filter, modifier }) => {
    const filters =
      modifier === 'only'
        ? state.selectedFiltersOnly
        : state.selectedFiltersExcept;
    const selectedFilters = filters.includes(filter)
      ? without(filters, filter)
      : [...filters, filter];
    return {
      ...state,
      [modifier === 'only'
        ? 'selectedFiltersOnly'
        : 'selectedFiltersExcept']: selectedFilters,
    };
  }),
  on(updateSearchTerm, (state, { term: searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(toggleCommandListElements, (state, { flag }) => ({
    ...state,
    displaySearchBar: flag,
    displayLastUpdated: flag,
  })),
  on(displayOrEditCommandInfo, (state, { command, extension, viewMode }) => ({
    ...state,
    viewMode,
    commandToDisplayOrEdit: command,
    extensionToDisplayOrEdit: extension,
  })),
  on(displayOrEditSnippet, (state, { snippet }) => ({
    ...state,
    snippetToDisplayOrEdit: snippet,
  })),
  on(stopEditOrDisplay, (state) => ({
    ...state,
    commandToDisplayOrEdit: undefined,
    extensionToDisplayOrEdit: undefined,
    snippetToDisplayOrEdit: undefined,
    viewMode: ViewMode.None,
  })),
  on(onListEnter, (state, { opcode, extension }) => ({
    ...state,
    opcodeOnLoad: opcode,
    extensionOnLoad: extension,
  })),
  on(changePage, (state, { index: currentPage }) => ({
    ...state,
    currentPage,
  })),
  on(resetFilters, (state) => ({
    ...state,
    ...defaultFilterState,
  }))
);

export function uiReducer(state: UiState, action: Action) {
  return _reducer(state, action);
}

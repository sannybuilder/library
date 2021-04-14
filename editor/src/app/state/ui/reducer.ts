import { Action, createReducer, on } from '@ngrx/store';
import { without } from 'lodash';

import { Command, ViewMode, Attribute, Game } from '../../models';
import {
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  toggleCommandListElements,
  toggleFilter,
  updateSearchTerm,
  displayOrEditSnippet,
  changePage,
  resetFilters,
  toggleClass,
  selectExtension,
} from './actions';
import { onListEnter } from '../game/actions';

export interface GameState {
  selectedExtensions: string[];
  selectedClasses: string[];
}

export interface UiState {
  searchTerm?: string;
  displaySearchBar: boolean;
  displayLastUpdated: boolean;
  selectedFiltersOnly: Attribute[];
  selectedFiltersExcept: Attribute[];
  commandToDisplayOrEdit?: Command;
  extensionToDisplayOrEdit?: string;
  snippetToDisplayOrEdit?: string;
  viewMode: ViewMode;
  opcodeOnLoad?: string;
  extensionOnLoad?: string;
  currentPage: number | 'all';
  games: Partial<Record<Game, GameState>>;
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
  games: {},
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
  on(toggleClass, (state, { game, className }) => {
    const { selectedClasses: selected } = state.games[game];
    const selectedClasses = selected.includes(className)
      ? without(selected, className)
      : [...selected, className];

    return { ...state, selectedClasses };
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
  })),
  on(selectExtension, (state, { game, extension, state: forceSelect }) => {
    const selectedExtensions = state.games[game]?.selectedExtensions ?? [];
    const isSelected = selectedExtensions.includes(extension);

    if (forceSelect && !isSelected) {
      return updateState(state, game, {
        selectedExtensions: [...selectedExtensions, extension],
      });
    }
    if (!forceSelect && isSelected) {
      return updateState(state, game, {
        selectedExtensions: without(selectedExtensions, extension),
      });
    }
    return state;
  })
);

export function uiReducer(state: UiState, action: Action) {
  return _reducer(state, action);
}

function updateState(state: UiState, game: Game, newState: Partial<GameState>) {
  return {
    ...state,
    games: {
      ...state.games,
      [game]: { ...(state.games[game] ?? {}), ...newState },
    },
  };
}

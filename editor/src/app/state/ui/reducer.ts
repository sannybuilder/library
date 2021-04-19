import { Action, createReducer, on } from '@ngrx/store';
import { intersection, partition, without } from 'lodash';

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
  selectClass,
  selectExtensions,
  displayClassOverview,
  displayOrEditEnum,
} from './actions';
import { onListEnter } from '../game/actions';

export interface GameState {
  selectedExtensions: string[];
  selectedClasses: Array<string | 'any' | 'none'>;
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
  enumToDisplayOrEdit?: string;
  viewMode: ViewMode;
  opcodeOnLoad?: string;
  extensionOnLoad?: string;
  enumOnLoad?: string;
  currentPage: number | 'all';
  games: Record<Game, GameState>;
  classToDisplay?: string;
}

const defaultFilterState: {
  searchTerm: string;
  selectedFiltersOnly: Attribute[];
  selectedFiltersExcept: Attribute[];
  games: Record<Game, GameState>;
} = {
  searchTerm: '',
  selectedFiltersOnly: [],
  selectedFiltersExcept: ['is_nop', 'is_unsupported'],
  games: {
    gta3: {
      selectedClasses: ['any'],
      selectedExtensions: [],
    },
    vc: {
      selectedClasses: ['any'],
      selectedExtensions: [],
    },
    sa: {
      selectedClasses: ['any'],
      selectedExtensions: [],
    },
  },
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
  on(displayOrEditEnum, (state, { enumName, viewMode }) => ({
    ...state,
    viewMode,
    enumToDisplayOrEdit: enumName,
  })),
  on(stopEditOrDisplay, (state) => ({
    ...state,
    commandToDisplayOrEdit: undefined,
    extensionToDisplayOrEdit: undefined,
    snippetToDisplayOrEdit: undefined,
    classToDisplay: undefined,
    enumToDisplayOrEdit: undefined,
    viewMode: ViewMode.None,
  })),
  on(onListEnter, (state, { opcode, extension, enumName }) => ({
    ...state,
    opcodeOnLoad: opcode,
    extensionOnLoad: extension,
    enumOnLoad: enumName,
  })),
  on(changePage, (state, { index: currentPage }) => ({
    ...state,
    currentPage,
  })),
  on(resetFilters, (state) => ({
    ...state,
    ...defaultFilterState,
  })),
  on(selectExtensions, (state, { game, extensions, state: forceSelect }) => {
    const selectedExtensions = state.games[game]?.selectedExtensions ?? [];
    const [selected, unselected] = partition(extensions, (extension) =>
      selectedExtensions.includes(extension)
    );

    if (forceSelect && unselected.length > 0) {
      return updateState(state, game, {
        selectedExtensions: [...selectedExtensions, ...unselected],
      });
    }
    if (!forceSelect && selected.length > 0) {
      return updateState(state, game, {
        selectedExtensions: without(selectedExtensions, ...selected),
      });
    }
    return state;
  }),
  on(selectClass, (state, { game, className, state: forceSelect }) => {
    const selectedClasses = state.games[game]?.selectedClasses ?? [];
    const specials = ['none', 'any'];
    const filtered = specials.includes(className)
      ? intersection(selectedClasses, [className])
      : without(selectedClasses, ...specials);
    const isSelected = filtered.includes(className);

    if (forceSelect && !isSelected) {
      return updateState(state, game, {
        selectedClasses: [...filtered, className],
      });
    }
    if (!forceSelect && isSelected) {
      return updateState(state, game, {
        selectedClasses: without(filtered, className),
      });
    }
    return state;
  }),
  on(displayClassOverview, (state, { className }) => ({
    ...state,
    classToDisplay: className,
    viewMode: ViewMode.ViewClass,
  }))
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

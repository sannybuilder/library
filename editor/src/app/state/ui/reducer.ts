import { createReducer, on } from '@ngrx/store';
import { intersection, partition, without } from 'lodash';

import {
  Command,
  ViewMode,
  Attribute,
  Game,
  EnumRaw,
  SyntaxKind,
} from '../../models';
import {
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  toggleCommandListElements,
  toggleAttribute,
  updateSearchTerm,
  displayOrEditSnippet,
  changePage,
  resetFilters,
  selectClass,
  selectExtensions,
  displayClassOverview,
  displayOrEditEnum,
  displayClassesList,
  displayEnumsList,
  displayExtensionList,
  displayDecisionTree,
  toggleInlineMethodDescription,
  toggleOpcodePresentation,
  toggleSearchHelp,
  dismissSearchHelp,
  toggleSidebar,
  displayJsonGenerator,
  switchSyntaxKind,
  toggleSnippetOnlySearch,
} from './actions';

export interface GameState {
  selectedExtensions: Array<string | 'any'>;
  selectedClasses: Array<string | 'any' | 'none'>;
}

export interface UiState {
  searchTerm: string;
  displaySearchBar: boolean;
  displayLastUpdated: boolean;
  displayInlineMethodDescription: boolean; // this should match localStorageSyncReducer in AppModule
  displayOpcodePresentation: boolean; // this should match localStorageSyncReducer in AppModule
  isSidebarCollapsed: boolean; // this should match localStorageSyncReducer in AppModule
  selectedAttributesOnly: Attribute[];
  selectedAttributesExcept: Attribute[];
  commandToDisplayOrEdit?: Command;
  extensionToDisplayOrEdit?: string;
  snippetToDisplayOrEdit?: string;
  selectedSyntaxKind: SyntaxKind;
  enumToDisplayOrEdit?: EnumRaw;
  viewMode: ViewMode;
  currentPage: number | 'all';
  games: Record<Game, GameState>;
  classToDisplay?: string;
  displaySearchHelp: boolean;
  isSearchHelpDismissed: boolean; // this should match localStorageSyncReducer in AppModule
  isSnippetOnly: boolean;
}

const defaultFilterState: {
  searchTerm: string;
  selectedAttributesOnly: Attribute[];
  selectedAttributesExcept: Attribute[];
  isSnippetOnly: boolean;
  games: Record<Game, GameState>;
} = {
  searchTerm: '',
  selectedAttributesOnly: [],
  selectedAttributesExcept: ['is_nop', 'is_unsupported'],
  isSnippetOnly: false,
  games: Object.values(Game).reduce((m, v) => {
    m[v] = {
      selectedClasses: ['any'],
      selectedExtensions: [],
    };
    return m;
  }, {} as Record<Game, GameState>),
};

export const initialState: UiState = {
  ...defaultFilterState,
  displayLastUpdated: false,
  displaySearchBar: false,
  displayInlineMethodDescription: false,
  displayOpcodePresentation: false,
  displaySearchHelp: false,
  isSearchHelpDismissed: false,
  isSidebarCollapsed: false,
  viewMode: ViewMode.None,
  currentPage: 1,
  selectedSyntaxKind: 'sb_command',
};

export const uiReducer = createReducer(
  initialState,
  on(toggleAttribute, (state, { attribute, modifier }) => {
    const attributes =
      modifier === 'only'
        ? state.selectedAttributesOnly
        : state.selectedAttributesExcept;
    const selectedAttributes = attributes.includes(attribute)
      ? without(attributes, attribute)
      : [...attributes, attribute];
    return {
      ...state,
      [modifier === 'only'
        ? 'selectedAttributesOnly'
        : 'selectedAttributesExcept']: selectedAttributes,
    };
  }),
  on(updateSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
    displaySearchHelp: false,
  })),
  on(toggleCommandListElements, (state, { flag }) => ({
    ...state,
    displaySearchBar: flag,
    displayLastUpdated: flag,
  })),
  on(toggleInlineMethodDescription, (state) => ({
    ...state,
    displayInlineMethodDescription: !state.displayInlineMethodDescription,
  })),
  on(toggleOpcodePresentation, (state) => ({
    ...state,
    displayOpcodePresentation: !state.displayOpcodePresentation,
  })),
  on(displayOrEditCommandInfo, (state, { command, extension, viewMode }) => ({
    ...state,
    viewMode,
    commandToDisplayOrEdit: command,
    extensionToDisplayOrEdit: extension,
    snippetToDisplayOrEdit: undefined,
  })),
  on(displayOrEditSnippet, (state, { snippet }) => ({
    ...state,
    snippetToDisplayOrEdit: snippet,
  })),
  on(displayOrEditEnum, (state, { enumToEdit, viewMode }) => ({
    ...state,
    viewMode,
    enumToDisplayOrEdit: enumToEdit,
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
  on(changePage, (state, { index: currentPage }) => ({
    ...state,
    currentPage,
  })),
  on(resetFilters, (state) => ({
    ...state,
    ...defaultFilterState,
  })),
  on(
    selectExtensions,
    (state, { game, extensions, state: forceSelect, extensionNames }) => {
      const selectedExtensions = state.games[game]?.selectedExtensions ?? [];

      const selectIf = (condition: boolean, extensions: string[]) => {
        return updateState(state, game, {
          selectedExtensions: condition ? extensions : ['any'],
        });
      };

      if (extensions.includes('any')) {
        return selectIf(!forceSelect, extensionNames);
      }
      const [selected, unselected] = partition(extensions, (extension) =>
        selectedExtensions.includes(extension)
      );

      if (forceSelect && unselected.length > 0) {
        const newSelection = [...selectedExtensions, ...unselected].filter(
          (p) => p !== 'any'
        );

        return selectIf(
          newSelection.length !== extensionNames.length,
          newSelection
        );
      }
      if (!forceSelect && selected.length > 0) {
        const newSelection = without(selectedExtensions, ...selected);
        return selectIf(newSelection.length !== 0, newSelection);
      }

      return state;
    }
  ),
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
  })),
  on(displayClassesList, (state) => ({
    ...state,
    viewMode: ViewMode.ViewAllClasses,
  })),
  on(displayEnumsList, (state) => ({
    ...state,
    viewMode: ViewMode.ViewAllEnums,
  })),
  on(displayExtensionList, (state) => ({
    ...state,
    viewMode: ViewMode.ViewAllExtensions,
  })),
  on(displayDecisionTree, (state) => ({
    ...state,
    viewMode: ViewMode.ViewDecisionTree,
  })),
  on(toggleSearchHelp, (state, { shouldDisplay, force }) => {
    const displaySearchHelp = force
      ? !state.displaySearchHelp
      : !state.isSearchHelpDismissed && !!shouldDisplay;

    return { ...state, displaySearchHelp };
  }),
  on(dismissSearchHelp, (state) => ({
    ...state,
    isSearchHelpDismissed: true,
    displaySearchHelp: false,
  })),
  on(toggleSidebar, (state) => ({
    ...state,
    isSidebarCollapsed: !state.isSidebarCollapsed,
  })),
  on(displayJsonGenerator, (state) => ({
    ...state,
    viewMode: ViewMode.ViewGenerateJson,
  })),
  on(switchSyntaxKind, (state, { syntaxKind }) => ({
    ...state,
    selectedSyntaxKind: syntaxKind,
  })),
  on(toggleSnippetOnlySearch, (state) => ({
    ...state,
    isSnippetOnly: !state.isSnippetOnly,
  })),
);

function updateState(state: UiState, game: Game, newState: Partial<GameState>) {
  return {
    ...state,
    games: {
      ...state.games,
      [game]: { ...(state.games[game] ?? {}), ...newState },
    },
  };
}

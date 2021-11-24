import { createReducer, on } from '@ngrx/store';
import { intersection, partition, without } from 'lodash';
import { getGameByName } from 'src/app/utils';

import {
  Command,
  ViewMode,
  Attribute,
  Game,
  EnumRaw,
  Platform,
  GamePlatforms,
  Version,
  GameVersions,
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
  displayDecisionTree,
  toggleInlineMethodDescription,
  toggleOpcodePresentation,
  toggleSearchHelp,
  dismissSearchHelp,
  toggleSidebar,
  selectPlatforms,
  selectVersions,
  preselectFiltersByGameName,
} from './actions';

export interface GameState {
  selectedExtensions: string[];
  selectedClasses: Array<string | 'any' | 'none'>;
  selectedPlatforms: Platform[];
  selectedVersions: Version[];
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
  enumToDisplayOrEdit?: EnumRaw;
  viewMode: ViewMode;
  currentPage: number | 'all';
  games: Record<Game, GameState>;
  classToDisplay?: string;
  displaySearchHelp: boolean;
  isSearchHelpDismissed: boolean; // this should match localStorageSyncReducer in AppModule
}

const defaultFilterState: {
  searchTerm: string;
  selectedAttributesOnly: Attribute[];
  selectedAttributesExcept: Attribute[];
  games: Record<Game, GameState>;
} = {
  searchTerm: '',
  selectedAttributesOnly: [],
  selectedAttributesExcept: ['is_nop', 'is_unsupported'],
  games: {
    gta3: {
      selectedClasses: ['any'],
      selectedExtensions: [],
      selectedPlatforms: [],
      selectedVersions: [],
    },
    vc: {
      selectedClasses: ['any'],
      selectedExtensions: [],
      selectedPlatforms: [],
      selectedVersions: [],
    },
    sa: {
      selectedClasses: ['any'],
      selectedExtensions: [],
      selectedPlatforms: [],
      selectedVersions: [],
    },
  },
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
  })),
  on(displayClassesList, (state) => ({
    ...state,
    viewMode: ViewMode.ViewAllClasses,
  })),
  on(displayEnumsList, (state) => ({
    ...state,
    viewMode: ViewMode.ViewAllEnums,
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
  on(selectPlatforms, (state, { game, platforms, state: forceSelect }) => {
    const selectedPlatforms = state.games[game]?.selectedPlatforms ?? [];

    const selectIf = (condition: boolean, platforms: Platform[]) => {
      return updateState(state, game, {
        selectedPlatforms: condition ? platforms : [Platform.Any],
      });
    };

    if (platforms.includes(Platform.Any)) {
      return selectIf(!forceSelect, GamePlatforms[game]);
    }
    const [selected, unselected] = partition(platforms, (platform) =>
      selectedPlatforms.includes(platform)
    );

    if (forceSelect && unselected.length > 0) {
      const newSelection = [...selectedPlatforms, ...unselected].filter(
        (p) => p !== Platform.Any
      );

      return selectIf(
        newSelection.length !== GamePlatforms[game].length,
        newSelection
      );
    }
    if (!forceSelect && selected.length > 0) {
      const newSelection = without(selectedPlatforms, ...selected);
      return selectIf(newSelection.length !== 0, newSelection);
    }

    return state;
  }),
  on(selectVersions, (state, { game, versions, state: forceSelect }) => {
    const selectedVersions = state.games[game]?.selectedVersions ?? [];

    const selectIf = (condition: boolean, versions: Version[]) => {
      return updateState(state, game, {
        selectedVersions: condition ? versions : [Version.Any],
      });
    };

    if (versions.includes(Version.Any)) {
      return selectIf(!forceSelect, GameVersions[game]);
    }
    const [selected, unselected] = partition(versions, (version) =>
      selectedVersions.includes(version)
    );

    if (forceSelect && unselected.length > 0) {
      const newSelection = [...selectedVersions, ...unselected].filter(
        (p) => p !== Version.Any
      );

      return selectIf(
        newSelection.length !== GameVersions[game].length,
        newSelection
      );
    }
    if (!forceSelect && selected.length > 0) {
      const newSelection = without(selectedVersions, ...selected);
      return selectIf(newSelection.length !== 0, newSelection);
    }

    return state;
  }),
  on(preselectFiltersByGameName, (state, { gameName }) => {
    const game = getGameByName(gameName);
    if (!game) {
      return state;
    }

    let selectedPlatforms: Platform[] = [Platform.Any];
    let selectedVersions: Version[] = [Version.Any];

    if (['gta3_unreal', 'vc_unreal', 'sa_unreal'].includes(gameName!)) {
      selectedPlatforms = [Platform.PC];
    } else if (['gta3_mobile', 'vc_mobile', 'sa_mobile'].includes(gameName!)) {
      selectedPlatforms = [Platform.Mobile];
    }

    if (['gta3_unreal', 'vc_unreal', 'sa_unreal'].includes(gameName!)) {
      selectedVersions = [Version._unreal10];
    } else {
      selectedVersions = GameVersions[game].filter(
        (v) => v !== Version._unreal10
      );
    }

    return updateState(state, game, {
      selectedPlatforms,
      selectedVersions,
    });
  })
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

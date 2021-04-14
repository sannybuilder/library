import { createFeatureSelector, createSelector } from '@ngrx/store';
import { flatMap, uniq } from 'lodash';
import { search } from '../../fusejs/fusejs';
import { Attribute, Command, Game } from '../../models';
import { extensions } from '../extensions/selectors';
import { game } from '../game/selectors';
import { UiState, GameState } from './reducer';

export const state = createFeatureSelector('ui');

const gameState = createSelector(
  state,
  game,
  (state: UiState, game: Game) => state.games[game]
);

export const selectedFiltersOnly = createSelector(
  state,
  (state: UiState) => state.selectedFiltersOnly
);

export const selectedFiltersExcept = createSelector(
  state,
  (state: UiState) => state.selectedFiltersExcept
);

export const selectedExtensions = createSelector(
  gameState,
  (state: GameState) => state?.selectedExtensions
);

export const isExtensionSelected = createSelector(
  selectedExtensions,
  (selectedExtensions: string[], props: { extension: string }) =>
    selectedExtensions?.includes(props.extension)
);

export const selectedClasses = createSelector(
  gameState,
  (state: GameState) => state?.selectedClasses
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
  (state: UiState) => state.commandToDisplayOrEdit
);

export const extensionToDisplayOrEdit = createSelector(
  state,
  (state: UiState) => state.extensionToDisplayOrEdit
);

export const viewMode = createSelector(
  state,
  (state: UiState) => state.viewMode
);

export const snippetToDisplayOrEdit = createSelector(
  state,
  (state: UiState) => state.snippetToDisplayOrEdit
);

export const opcodeOnLoad = createSelector(state, (state: UiState) => ({
  opcode: state.opcodeOnLoad,
  extension: state.extensionOnLoad,
}));

export const currentPage = createSelector(
  state,
  (state: UiState) => state.currentPage
);

export const rows = createSelector(
  extensions,
  selectedExtensions,
  selectedFiltersOnly,
  selectedFiltersExcept,
  searchTerm,
  (
    extensions,
    selectedExtensions,
    selectedFiltersOnly,
    selectedFiltersExcept,
    searchTerm
  ) => {
    const selected = extensions?.filter(({ name }) =>
      selectedExtensions?.includes(name)
    );

    return (
      selected &&
      flatMap(selected, ({ name: extension, commands }) => {
        const filtered = filterCommands(
          commands,
          selectedFiltersOnly,
          selectedFiltersExcept
        );
        return search(filtered, searchTerm).map((command) => ({
          extension,
          command,
        }));
      })
    );
  }
);

function filterCommands(
  elements: Command[],
  only: Attribute[],
  except: Attribute[]
) {
  return elements.filter(
    (element) =>
      only.every((attr) => element.attrs?.[attr]) &&
      !except.some((attr) => element.attrs?.[attr])
  );
}

// todo: move to ui
export const classNamesForSelectedExtensions = createSelector(
  extensions,
  selectedExtensions,
  (extensions, selectedExtensions) => {
    const selected = extensions?.filter(({ name }) =>
      selectedExtensions?.includes(name)
    );
    return (
      selected &&
      uniq(
        flatMap(selected, ({ commands }) =>
          commands.map((command) => command.class || '(no class)')
        )
      )
    );
  }
);

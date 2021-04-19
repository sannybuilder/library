import { createFeatureSelector, createSelector } from '@ngrx/store';
import { flatMap, sortBy } from 'lodash';
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

export const isClassSelected = createSelector(
  selectedClasses,
  (selectedClasses: string[], props: { className: string | 'any' | 'none' }) =>
    selectedClasses?.includes(props.className)
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

export const enumToDisplayOrEdit = createSelector(
  state,
  (state: UiState) => state.enumToDisplayOrEdit
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

export const enumOnLoad = createSelector(
  state,
  (state: UiState) => state.enumOnLoad
);

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
  selectedClasses,
  (
    extensions,
    selectedExtensions,
    selectedFiltersOnly,
    selectedFiltersExcept,
    searchTerm,
    selectedClasses
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
          selectedFiltersExcept,
          selectedClasses
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
  commands: Command[],
  only: Attribute[],
  except: Attribute[],
  classes: string[]
) {
  return commands.filter(
    (command) =>
      only.every((attr) => command.attrs?.[attr]) &&
      !except.some((attr) => command.attrs?.[attr]) &&
      isClassMatching(command, classes ?? [])
  );
}

function isClassMatching(
  command: Command,
  classes: Array<string | 'any' | 'none'>
): boolean {
  if (classes.includes('any')) {
    return true;
  }
  const needle = command.class ?? 'none';
  return classes.includes(needle);
}

export const classToDisplay = createSelector(
  state,
  (state: UiState) => state.classToDisplay
);

export const classToDisplayCommands = createSelector(
  extensions,
  classToDisplay,
  (extensions, classToDisplay) => {
    if (!classToDisplay) {
      return;
    }

    const extensionCommands = flatMap(extensions, (extension) => {
      return extension.commands
        .filter((command) => command.class === classToDisplay)
        .map((command) => ({ command, extension: extension.name }));
    });

    return sortBy(extensionCommands, [
      'command.attrs.is_constructor',
      'command.attrs.is_destructor',
      'command.attrs.is_static',
      'command.member',
      'command.attrs.is_nop',
      'command.attrs.is_unsupported',
    ]);
  }
);

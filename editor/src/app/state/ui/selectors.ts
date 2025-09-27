import { createFeatureSelector, createSelector } from '@ngrx/store';
import { flatMap, sortBy, uniqBy } from 'lodash';
import {
  isPlatformMatching,
  isVersionMatching,
  exactSearch,
  abbrSearch,
  partialSearch,
  doesGameRequireOpcode,
} from '../../utils';
import { Attribute, Command, Game, Platform, Version } from '../../models';
import { extensions } from '../extensions/selectors';
import { game } from '../game/selectors';
import { UiState, GameState } from './reducer';
import { selectedPlatforms, selectedVersions } from '../version/selectors';
import { tree as gitTree } from '../changes/selectors';

export const state = createFeatureSelector<UiState>('ui');

const gameState = createSelector(
  state,
  game,
  (state: UiState, game: Game | undefined) =>
    game ? state.games[game] : undefined
);

export const selectedAttributesOnly = createSelector(
  state,
  (state: UiState) => state.selectedAttributesOnly
);

export const selectedAttributesExcept = createSelector(
  state,
  (state: UiState) => state.selectedAttributesExcept
);

export const selectedExtensions = createSelector(
  gameState,
  (state: GameState | undefined) => state?.selectedExtensions
);

export const isExtensionSelected = createSelector(
  selectedExtensions,
  (
    selectedExtensions: string[] | undefined,
    props: { extension: string | 'any' }
  ) => selectedExtensions?.includes(props.extension)
);

export const selectedClasses = createSelector(
  gameState,
  (state: GameState | undefined) => state?.selectedClasses
);

export const isClassSelected = createSelector(
  selectedClasses,
  (
    selectedClasses: string[] | undefined,
    props: { className: string | 'any' | 'none' }
  ) => selectedClasses?.includes(props.className)
);

export const isAttributeSelectedOnly = createSelector(
  selectedAttributesOnly,
  (selectedAttributes: string[], props: { attribute: string }) =>
    selectedAttributes.includes(props.attribute)
);

export const isAttributeSelectedExcept = createSelector(
  selectedAttributesExcept,
  (selectedAttributes: string[], props: { attribute: string }) =>
    selectedAttributes.includes(props.attribute)
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

export const displayInlineMethodDescription = createSelector(
  state,
  (state: UiState) => state.displayInlineMethodDescription
);

export const displayOpcodePresentation = createSelector(
  state,
  (state: UiState) => state.displayOpcodePresentation
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

export const currentPage = createSelector(
  state,
  (state: UiState) => state.currentPage
);

export const isSnippetOnly = createSelector(
  state,
  (state: UiState) => state.isSnippetOnly
);

export const appliedFilters = createSelector(
  selectedExtensions,
  selectedAttributesOnly,
  selectedAttributesExcept,
  searchTerm,
  selectedClasses,
  selectedPlatforms,
  selectedVersions,
  isSnippetOnly,
  (
    selectedExtensions,
    selectedAttributesOnly,
    selectedAttributesExcept,
    searchTerm,
    selectedClasses,
    selectedPlatforms,
    selectedVersions,
    isSnippetOnly
  ) => {

    const query = [];

    if (searchTerm) {
      query.push({ key: 'ui.filters.withTerm', value: searchTerm });
    } else {
      query.push({ key: 'ui.filters.anyCommand', value: '' });
    }
    if (selectedExtensions && !selectedExtensions.includes('any')) {
      query.push({ key: 'ui.filters.withExtensions', value: selectedExtensions });
    }

    if (selectedAttributesOnly.length) {
      query.push({ key: 'ui.filters.withAttrs', value: selectedAttributesOnly });
    }

    if (selectedAttributesExcept.length) {
      query.push({ key: 'ui.filters.withoutAttrs', value: selectedAttributesExcept });
    }

    if (selectedPlatforms && selectedPlatforms?.length > 1) {
      query.push({ key: 'ui.filters.withPlatforms', value: selectedPlatforms });
    }

    if (selectedVersions && selectedVersions?.length > 1) {
      query.push({ key: 'ui.filters.withVersions', value: selectedVersions });
    }

    if (selectedClasses?.length && !selectedClasses.includes('any')) {
      query.push({ key: 'ui.filters.withClasses', value: selectedClasses });
    }

    if (isSnippetOnly) {
      query.push({ key: 'ui.filters.withSnippet', value: '' });
    }

    return query;
  }
);

export const rows = createSelector(
  extensions,
  selectedExtensions,
  selectedAttributesOnly,
  selectedAttributesExcept,
  searchTerm,
  selectedClasses,
  selectedPlatforms,
  selectedVersions,
  isSnippetOnly,
  gitTree,
  game,
  (
    extensions,
    selectedExtensions,
    selectedAttributesOnly,
    selectedAttributesExcept,
    searchTerm,
    selectedClasses,
    selectedPlatforms,
    selectedVersions,
    isSnippetOnly,
    gitTree,
    game
  ) => {
    const selected = extensions?.filter(
      ({ name }) =>
        selectedExtensions?.includes('any') ||
        selectedExtensions?.includes(name)
    );

    if (!selected) {
      return [];
    }

    const filter = (
      cb: (commands: Command[], searchTerm: string, game: Game) => Command[]
    ) => {
      return flatMap(selected, ({ name: extension, commands }) => {
        let filtered = filterCommands(
          commands,
          selectedAttributesOnly,
          selectedAttributesExcept,
          selectedClasses,
          selectedPlatforms,
          selectedVersions
        );
        if (isSnippetOnly && game) {
          filtered = filterBySnippets(filtered, gitTree, extension, game);
        }

        if (searchTerm) {
          filtered = cb(filtered, searchTerm, game!);
        }
        return filtered.map((command) => ({
          extension,
          command,
        }));
      });
    };

    const abbrFound = searchTerm ? filter(abbrSearch) : [];

    const exactmatch = filter(exactSearch);
    if (exactmatch.length > 0) {
      return mergeWithAbbr(exactmatch, abbrFound, game!);
    }

    const partialmatch = filter(partialSearch);
    return mergeWithAbbr(partialmatch, abbrFound, game!);
  }
);

function mergeWithAbbr<T = { command: Command; extension: string }>(
  filtered: T[],
  abbr: T[],
  game: Game
) {
  const sorted = sortBy(filtered, 'command._highlight.score');
  if (abbr.length > 0) {
    const key = doesGameRequireOpcode(game) ? 'id' : 'name';
    return uniqBy(abbr.concat(sorted), 'command.' + key);
  }
  return sorted;
}

function filterCommands(
  commands: Command[],
  only: Attribute[],
  except: Attribute[],
  classes: string[] | undefined,
  selectedPlatforms: Platform[] | undefined,
  selectedVersions: Version[] | undefined
) {
  return commands.filter(
    (command) =>
      only.every((attr) => command.attrs?.[attr]) &&
      !except.some((attr) => command.attrs?.[attr]) &&
      isClassMatching(command, classes ?? []) &&
      isPlatformMatching(command, selectedPlatforms ?? [Platform.Any]) &&
      isVersionMatching(command, selectedVersions ?? [Version.Any])
  );
}

function filterBySnippets(
  commands: Command[],
  tree: string[],
  extension: string,
  game: Game
) {
  return commands.filter((c) => {
    return tree.includes(`${game}/snippets/${extension}/${c.id || c.name}.txt`);
  });
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
  selectedPlatforms,
  selectedVersions,
  (extensions, classToDisplay, selectedPlatforms, selectedVersions) => {
    if (!classToDisplay) {
      return undefined;
    }

    const extensionCommands = flatMap(extensions, (extension) => {
      return extension.commands
        .filter(
          (command) =>
            command.class === classToDisplay &&
            isPlatformMatching(command, selectedPlatforms ?? [Platform.Any]) &&
            isVersionMatching(command, selectedVersions ?? [Version.Any])
        )
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

export const displaySearchHelp = createSelector(
  state,
  (state: UiState) => state.displaySearchHelp
);

export const isSearchHelpDismissed = createSelector(
  state,
  (state: UiState) => state.isSearchHelpDismissed
);

export const isSidebarCollapsed = createSelector(
  state,
  (state: UiState) => state.isSidebarCollapsed
);

export const selectedSyntaxKind = createSelector(
  state,
  (state: UiState) => state.selectedSyntaxKind
);

export const displayFunctionDeclaration = createSelector(
  state,
  (state: UiState) => state.displayFunctionDeclaration
);

export const isHotkeyInfoDismissed = createSelector(
  state,
  (state: UiState) => state.isHotkeyInfoDismissed
);

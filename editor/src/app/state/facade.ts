import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Command, Extension, Game, ViewMode } from '../models';
import {
  loadExtensions,
  updateExtensions,
  updateCommand,
  toggleExtension,
  updateSearchTerm,
  toggleCommandListElements,
  toggleFilter,
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  onListEnter,
} from './actions';
import {
  extensionsSelector,
  lastUpdateSelector,
  loadingSelector,
  selectedExtensionsSelector,
  searchTermSelector,
  displaySearchBarSelector,
  displayLastUpdatedSelector,
  entitiesSelector,
  selectedFiltersSelector,
  isFilterSelectedSelector,
  gameSelector,
  commandToDisplayOrEditSelector,
  opcodeOnLoadSelector,
  extensionNamesSelector,
} from './selectors';

@Injectable({ providedIn: 'root' })
export class StateFacade {
  extensions$ = this.store$
    .select(extensionsSelector)
    .pipe(filter<Extension[]>(Boolean));

  extensionNames$ = this.store$.select(extensionNamesSelector);
  loading$ = this.store$.select(loadingSelector);
  lastUpdate$ = this.store$.select(lastUpdateSelector);
  searchTerm$ = this.store$.select(searchTermSelector);
  displaySearchBar$ = this.store$.select(displaySearchBarSelector);
  displayLastUpdated$ = this.store$.select(displayLastUpdatedSelector);
  selectedFilters$ = this.store$.select(selectedFiltersSelector);
  game$ = this.store$
    .select(gameSelector)
    .pipe(distinctUntilChanged(), filter<Game>(Boolean));

  commandToDisplayOrEdit$ = this.store$.select(commandToDisplayOrEditSelector);

  opcodeOnLoad$ = this.store$.select(opcodeOnLoadSelector).pipe(
    distinctUntilChanged(
      (a, b) => a.opcode === b.opcode && a.extension === b.extension
    ),
    filter((a) => !!a.extension)
  );

  getExtensionCheckedState(extension: string) {
    return this.store$.select(selectedExtensionsSelector, { extension });
  }

  getFilterCheckedState(filter: string) {
    return this.store$.select(isFilterSelectedSelector, { filter });
  }

  getExtensionEntities(extension: string) {
    return this.store$.select(entitiesSelector, { extension });
  }

  constructor(private store$: Store) {}

  loadExtensions(game: Game) {
    this.store$.dispatch(loadExtensions({ game }));
  }

  updateExtensions(extensions: Extension[], game: Game) {
    this.store$.dispatch(updateExtensions({ extensions, game }));
  }

  updateCommand({
    command,
    newExtension,
    oldExtension,
  }: {
    command: Command;
    newExtension: string;
    oldExtension: string;
  }) {
    this.store$.dispatch(
      updateCommand({ command, newExtension, oldExtension })
    );
  }

  toggleExtension(extension: string) {
    this.store$.dispatch(toggleExtension({ extension }));
  }

  toggleFilter(filter: string) {
    this.store$.dispatch(toggleFilter({ filter }));
  }

  updateSearch(term: string) {
    this.store$.dispatch(updateSearchTerm({ term }));
  }

  toggleCommandListElements(flag: boolean) {
    this.store$.dispatch(toggleCommandListElements({ flag }));
  }

  displayCommandInfo(command: Command, extension: string) {
    this.store$.dispatch(
      displayOrEditCommandInfo({ command, extension, viewMode: ViewMode.View })
    );
  }

  editCommandInfo(command: Command, extension: string) {
    this.store$.dispatch(
      displayOrEditCommandInfo({ command, extension, viewMode: ViewMode.Edit })
    );
  }

  stopEditOrDisplay() {
    this.store$.dispatch(stopEditOrDisplay());
  }

  onListEnter(game: Game, opcode: string, extension: string) {
    this.store$.dispatch(onListEnter({ game, opcode, extension }));
  }
}

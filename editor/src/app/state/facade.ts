import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
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
} from './selectors';

@Injectable({ providedIn: 'root' })
export class StateFacade {
  extensions$ = this.store$
    .select(extensionsSelector)
    .pipe(filter<Extension[]>(Boolean));

  extensionNames$ = this.extensions$.pipe(
    map((extensions) => extensions.map((e) => e.name))
  );
  loading$ = this.store$.select(loadingSelector);
  lastUpdate$ = this.store$.select(lastUpdateSelector);
  searchTerm$ = this.store$.select(searchTermSelector);
  displaySearchBar$ = this.store$.select(displaySearchBarSelector);
  displayLastUpdated$ = this.store$.select(displayLastUpdatedSelector);
  selectedFilters$ = this.store$.select(selectedFiltersSelector);
  game$ = this.store$.select(gameSelector);
  commandToDisplayOrEdit$ = this.store$.select(commandToDisplayOrEditSelector);

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
    game,
  }: {
    command: Command;
    newExtension: string;
    oldExtension: string;
    game: Game;
  }) {
    this.store$.dispatch(
      updateCommand({ command, newExtension, oldExtension, game })
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

  displayCommandInfo({
    command,
    extension,
  }: {
    command: Command;
    extension: string;
  }) {
    this.store$.dispatch(
      displayOrEditCommandInfo({ command, extension, viewMode: ViewMode.View })
    );
  }

  editCommandInfo({
    command,
    extension,
  }: {
    command: Command;
    extension: string;
  }) {
    this.store$.dispatch(
      displayOrEditCommandInfo({ command, extension, viewMode: ViewMode.Edit })
    );
  }

  stopEditOrDisplay() {
    this.store$.dispatch(stopEditOrDisplay());
  }
}

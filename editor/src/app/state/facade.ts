import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Command, Extension, Game } from '../models';
import {
  editCommand,
  loadExtensions,
  updateExtensions,
  updateCommand,
  toggleExtension,
  updateSearchTerm,
  toggleCommandListElements,
} from './actions';
import {
  extensionsSelector,
  editCommandSelector,
  lastUpdateSelector,
  loadingSelector,
  selectedExtensionsSelector,
  searchTermSelector,
  displaySearchBarSelector,
  displayLastUpdatedSelector,
  entitiesSelector,
} from './selectors';

@Injectable({ providedIn: 'root' })
export class StateFacade {
  extensions$ = this.store$
    .select(extensionsSelector)
    .pipe(filter<Extension[]>(Boolean));
  editCommand$ = this.store$.select(editCommandSelector);
  loading$ = this.store$.select(loadingSelector);
  lastUpdate$ = this.store$.select(lastUpdateSelector);
  searchTerm$ = this.store$.select(searchTermSelector);
  displaySearchBar$ = this.store$.select(displaySearchBarSelector);
  displayLastUpdated$ = this.store$.select(displayLastUpdatedSelector);

  getExtensionCheckedState(extension: string) {
    return this.store$.select(selectedExtensionsSelector, { extension });
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

  editCommand(command: Command) {
    this.store$.dispatch(editCommand({ command }));
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

  updateSearch(term: string) {
    this.store$.dispatch(updateSearchTerm({ term }));
  }

  toggleCommandListElements(flag: boolean) {
    this.store$.dispatch(toggleCommandListElements({ flag }));
  }
}

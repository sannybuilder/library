import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Command, Extension, Game } from '../models';
import {
  editCommand,
  loadExtensions,
  updateExtensions,
  updateCommand,
  toggleExtension,
  updateSearchTerm,
} from './actions';
import {
  extensionsSelector,
  editCommandSelector,
  lastUpdateSelector,
  loadingSelector,
  selectedExtensionsSelector,
  searchTermSelector,
} from './selectors';

@Injectable({ providedIn: 'root' })
export class StateFacade {
  extensions$ = this.store$.select(extensionsSelector);
  editCommand$ = this.store$.select(editCommandSelector);
  loading$ = this.store$.select(loadingSelector);
  lastUpdate$ = this.store$.select(lastUpdateSelector);
  searchTerm$ = this.store$.select(searchTermSelector);

  getExtensionCheckedState(extension: string) {
    return this.store$.select(selectedExtensionsSelector, { extension });
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

  updateCommand(command: Command, extension: string, game: Game) {
    this.store$.dispatch(updateCommand({ command, extension, game }));
  }

  toggleExtension(extension: string) {
    this.store$.dispatch(toggleExtension({ extension }));
  }

  updateSearch(term: string) {
    this.store$.dispatch(updateSearchTerm({ term }));
  }
}

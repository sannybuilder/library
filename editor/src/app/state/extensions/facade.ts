import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Command, Extension, Game, Modifier, ViewMode } from '../../models';
import {
  submitChanges,
  updateCommand,
  toggleExtension,
  updateSearchTerm,
  toggleCommandListElements,
  toggleFilter,
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  onListEnter,
} from './actions';
import * as selector from './selectors';

@Injectable()
export class ExtensionsFacade {
  extensions$ = this.store$
    .select(selector.extensions)
    .pipe(filter<Extension[]>(Boolean));

  extensionNames$ = this.store$.select(selector.extensionNames);
  loading$ = this.store$.select(selector.loading);
  lastUpdate$ = this.store$.select(selector.lastUpdate);
  searchTerm$ = this.store$.select(selector.searchTerm);
  displaySearchBar$ = this.store$.select(selector.displaySearchBar);
  displayLastUpdated$ = this.store$.select(selector.displayLastUpdated);
  selectedFiltersOnly$ = this.store$.select(selector.selectedFiltersOnly);
  selectedFiltersExcept$ = this.store$.select(selector.selectedFiltersExcept);
  changesCount$ = this.store$.select(selector.changesCount);

  game$ = this.store$
    .select(selector.game)
    .pipe(distinctUntilChanged(), filter<Game>(Boolean));

  commandToDisplayOrEdit$ = this.store$.select(selector.commandToDisplayOrEdit);

  opcodeOnLoad$ = this.store$.select(selector.opcodeOnLoad).pipe(
    distinctUntilChanged(
      (a, b) => a.opcode === b.opcode && a.extension === b.extension
    ),
    filter((a) => !!a.extension)
  );

  getExtensionCheckedState(extension: string) {
    return this.store$.select(selector.selectedExtensions, {
      extension,
    });
  }

  getSnippet(extension: string, opcode: string) {
    return this.store$.select(selector.snippets, {
      extension,
      opcode,
    });
  }

  getFilterCheckedState(filter: string, modifier: Modifier) {
    return this.store$.select(
      modifier === 'only'
        ? selector.isFilterSelectedOnly
        : selector.isFilterSelectedExcept,
      { filter }
    );
  }

  getExtensionEntities(extension: string) {
    return this.store$.select(selector.entities, { extension });
  }

  constructor(private store$: Store) {}

  submitChanges() {
    this.store$.dispatch(submitChanges());
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

  toggleFilter(filter: string, modifier: Modifier) {
    this.store$.dispatch(toggleFilter({ filter, modifier }));
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

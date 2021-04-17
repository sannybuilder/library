import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Attribute, Command, Game, Modifier, ViewMode } from '../../models';
import {
  updateSearchTerm,
  toggleCommandListElements,
  toggleFilter,
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  changePage,
  scrollTop,
  resetFilters,
  selectClass,
  selectExtensions,
  displayClassOverview,
} from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  searchTerm$ = this.store$.select(selector.searchTerm);
  displaySearchBar$ = this.store$.select(selector.displaySearchBar);
  displayLastUpdated$ = this.store$.select(selector.displayLastUpdated);
  selectedFiltersOnly$ = this.store$.select(selector.selectedFiltersOnly);
  selectedFiltersExcept$ = this.store$.select(selector.selectedFiltersExcept);
  selectedExtensions$ = this.store$.select(selector.selectedExtensions);
  currentPage$ = this.store$.select(selector.currentPage);
  commandToDisplayOrEdit$ = this.store$.select(selector.commandToDisplayOrEdit);
  extensionToDisplayOrEdit$ = this.store$.select(
    selector.extensionToDisplayOrEdit
  );
  viewMode$ = this.store$.select(selector.viewMode);
  snippetToDisplayOrEdit$ = this.store$.select(selector.snippetToDisplayOrEdit);
  rows$ = this.store$.select(selector.rows);
  opcodeOnLoad$ = this.store$.select(selector.opcodeOnLoad).pipe(
    distinctUntilChanged(
      (a, b) => a.opcode === b.opcode && a.extension === b.extension
    ),
    filter((a) => !!a.extension)
  );
  classToDisplay$ = this.store$.select(selector.classToDisplay);
  classToDisplayCommands$ = this.store$.select(selector.classToDisplayCommands);

  getFilterCheckedState(filter: Attribute, modifier: Modifier) {
    return this.store$.select(
      modifier === 'only'
        ? selector.isFilterSelectedOnly
        : selector.isFilterSelectedExcept,
      { filter }
    );
  }

  constructor(private store$: Store) {}

  toggleFilter(filter: Attribute, modifier: Modifier) {
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

  changePage(index: number) {
    this.store$.dispatch(changePage({ index }));
  }

  scrollTop() {
    this.store$.dispatch(scrollTop());
  }

  resetFilters() {
    this.store$.dispatch(resetFilters());
  }

  selectExtensions(game: Game, extensions: string[], state: boolean) {
    this.store$.dispatch(selectExtensions({ game, extensions, state }));
  }

  selectClass(game: Game, className: string, state: boolean) {
    this.store$.dispatch(selectClass({ game, className, state }));
  }

  getExtensionCheckedState(extension: string) {
    return this.store$.select(selector.isExtensionSelected, {
      extension,
    });
  }

  getClassCheckedState(className: string) {
    return this.store$.select(selector.isClassSelected, {
      className,
    });
  }

  displayClassOverview(className: string) {
    this.store$.dispatch(displayClassOverview({ className }));
  }
}

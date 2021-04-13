import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Attribute, Command, Modifier, ViewMode } from '../../models';
import {
  updateSearchTerm,
  toggleCommandListElements,
  toggleFilter,
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  changePage,
  scrollTop,
  resetFilters,
} from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  searchTerm$ = this.store$.select(selector.searchTerm);
  displaySearchBar$ = this.store$.select(selector.displaySearchBar);
  displayLastUpdated$ = this.store$.select(selector.displayLastUpdated);
  selectedFiltersOnly$ = this.store$.select(selector.selectedFiltersOnly);
  selectedFiltersExcept$ = this.store$.select(selector.selectedFiltersExcept);
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
}

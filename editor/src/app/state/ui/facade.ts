import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Config, CONFIG } from '../../config';
import {
  Attribute,
  Command,
  EnumRaw,
  Game,
  GenerateJsonModel,
  Modifier,
  SyntaxKind,
  ViewMode,
} from '../../models';
import { AuthFacade } from '../auth/facade';
import {
  updateSearchTerm,
  toggleCommandListElements,
  toggleAttribute,
  displayOrEditCommandInfo,
  stopEditOrDisplay,
  changePage,
  scrollTop,
  resetFilters,
  selectClass,
  selectExtensions,
  displayClassOverview,
  displayOrEditEnum,
  toggleInlineMethodDescription,
  toggleOpcodePresentation,
  toggleSearchHelp,
  dismissSearchHelp,
  toggleSidebar,
  displayJsonGenerator,
  generateNewJson,
  displayExtensionList,
  switchSyntaxKind,
} from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class UiFacade {
  canEdit$ = this._auth.isAuthorized$.pipe(
    map(
      (isAuthorized) =>
        !this._config.features.shouldBeAuthorizedToEdit || isAuthorized
    )
  );
  searchTerm$ = this.store$.select(selector.searchTerm);
  displaySearchBar$ = this.store$.select(selector.displaySearchBar);
  displaySearchHelp$ = this.store$.select(selector.displaySearchHelp);
  isSearchHelpDismissed$ = this.store$.select(selector.isSearchHelpDismissed);
  isSidebarCollapsed$ = this.store$.select(selector.isSidebarCollapsed);

  displayLastUpdated$ = this.store$.select(selector.displayLastUpdated);
  displayInlineMethodDescription$ = this.store$.select(
    selector.displayInlineMethodDescription
  );
  displayOpcodePresentation$ = this.store$.select(
    selector.displayOpcodePresentation
  );
  selectedExtensions$ = this.store$.select(selector.selectedExtensions);
  selectedSyntaxKind$ = this.store$.select(selector.selectedSyntaxKind);
  currentPage$ = this.store$.select(selector.currentPage);
  commandToDisplayOrEdit$ = this.store$.select(selector.commandToDisplayOrEdit);
  extensionToDisplayOrEdit$ = this.store$.select(
    selector.extensionToDisplayOrEdit
  );
  enumToDisplayOrEdit$ = this.store$.select(selector.enumToDisplayOrEdit);
  viewMode$ = this.store$.select(selector.viewMode);
  snippetToDisplayOrEdit$ = this.store$.select(selector.snippetToDisplayOrEdit);
  rows$ = this.store$.select(selector.rows);

  classToDisplay$ = this.store$.select(selector.classToDisplay);
  classToDisplayCommands$ = this.store$.select(selector.classToDisplayCommands);

  getAttributeCheckedState(attribute: Attribute, modifier: Modifier) {
    return this.store$.select(
      modifier === 'only'
        ? selector.isAttributeSelectedOnly
        : selector.isAttributeSelectedExcept,
      { attribute }
    );
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

  constructor(
    private store$: Store,
    private _auth: AuthFacade,
    @Inject(CONFIG) private _config: Config
  ) {}

  toggleAttribute(attribute: Attribute, modifier: Modifier) {
    this.store$.dispatch(toggleAttribute({ attribute, modifier }));
  }

  updateSearch(searchTerm: string, autoOpenSingleResult = false) {
    this.store$.dispatch(updateSearchTerm({ searchTerm, autoOpenSingleResult }));
  }

  toggleCommandListElements(flag: boolean) {
    this.store$.dispatch(toggleCommandListElements({ flag }));
  }

  toggleInlineMethodDescription() {
    this.store$.dispatch(toggleInlineMethodDescription());
  }

  toggleOpcodePresentation() {
    this.store$.dispatch(toggleOpcodePresentation());
  }

  toggleSidebar() {
    this.store$.dispatch(toggleSidebar());
  }

  displayCommandInfo(command: Command, extension: string) {
    this.store$.dispatch(
      displayOrEditCommandInfo({
        command,
        extension,
        viewMode: ViewMode.ViewCommand,
      })
    );
  }

  editCommandInfo(command: Command, extension: string) {
    this.store$.dispatch(
      displayOrEditCommandInfo({
        command,
        extension,
        viewMode: ViewMode.EditCommand,
      })
    );
  }

  editEnum(enumToEdit: EnumRaw) {
    this.store$.dispatch(
      displayOrEditEnum({ enumToEdit, viewMode: ViewMode.EditEnum })
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

  selectExtensions(game: Game, extensions: string[], state: boolean, extensionNames: string[]) {
    this.store$.dispatch(selectExtensions({ game, extensions, state, extensionNames }));
  }

  selectClass(game: Game, className: string, state: boolean) {
    this.store$.dispatch(selectClass({ game, className, state }));
  }

  displayClassOverview(className: string) {
    this.store$.dispatch(displayClassOverview({ className }));
  }

  toggleSearchHelp({
    shouldDisplay,
    force,
  }: {
    shouldDisplay?: boolean;
    force?: boolean;
  }) {
    this.store$.dispatch(toggleSearchHelp({ shouldDisplay, force }));
  }

  dismissSearchHelp() {
    this.store$.dispatch(dismissSearchHelp());
  }

  displayJsonGenerator() {
    this.store$.dispatch(displayJsonGenerator());
  }

  generateNewJson(model: GenerateJsonModel) {
    this.store$.dispatch(generateNewJson({ model }));
  }

  displayExtensionList() {
    this.store$.dispatch(displayExtensionList());
  }

  switchSyntaxKind(syntaxKind: SyntaxKind) {
    this.store$.dispatch(switchSyntaxKind({ syntaxKind }))
  }
}

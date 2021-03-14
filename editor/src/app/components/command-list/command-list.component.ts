import { Component, EventEmitter, Input, Output } from '@angular/core';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { Command, Game, SEARCH_OPTIONS } from '../../models';
import { ExtensionsFacade, SnippetsFacade, UiFacade } from '../../state';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent {
  @Input() game: Game;
  @Input() canEdit: boolean;
  @Output() view: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();
  @Output() edit: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();

  extensions$ = this._extensions.extensions$;
  loading$ = this._extensions.loading$;
  selectedFiltersOnly$ = this._ui.selectedFiltersOnly$;
  selectedFiltersExcept$ = this._ui.selectedFiltersExcept$;
  searchTerm$ = this._ui.searchTerm$.pipe(debounce(() => timer(500)));
  searchOptions = SEARCH_OPTIONS;

  constructor(
    private _extensions: ExtensionsFacade,
    private _snippets: SnippetsFacade,
    private _ui: UiFacade
  ) {}

  isExtensionChecked(extension: string) {
    return this._extensions.getExtensionCheckedState(extension);
  }

  onEdit(command: Command, extension: string) {
    this.edit.emit({ command, extension });
    return false;
  }

  onView(command: Command, extension: string) {
    this.view.emit({ command, extension });
    return false;
  }

  getSnippet(extension: string, opcode: string) {
    return this._snippets.getSnippet(extension, opcode);
  }
}

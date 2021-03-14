import { Component, EventEmitter, Input, Output } from '@angular/core';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { ExtensionsFacade } from '../../state/extensions/facade';
import { Command, Game, SEARCH_OPTIONS } from '../../models';
import { SnippetsFacade } from '../../state/snippets/facade';

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
  selectedFiltersOnly$ = this._extensions.selectedFiltersOnly$;
  selectedFiltersExcept$ = this._extensions.selectedFiltersExcept$;
  searchTerm$ = this._extensions.searchTerm$.pipe(debounce(() => timer(500)));
  searchOptions = SEARCH_OPTIONS;

  constructor(
    private _extensions: ExtensionsFacade,
    private _snippets: SnippetsFacade
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

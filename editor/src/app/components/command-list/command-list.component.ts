import { Component, EventEmitter, Input, Output } from '@angular/core';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { StateFacade } from '../../state/facade';
import { Command, Game, SEARCH_OPTIONS } from '../../models';

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

  extensions$ = this._facade.extensions$;
  loading$ = this._facade.loading$;
  selectedFiltersOnly$ = this._facade.selectedFiltersOnly$;
  selectedFiltersExcept$ = this._facade.selectedFiltersExcept$;
  searchTerm$ = this._facade.searchTerm$.pipe(debounce(() => timer(500)));
  searchOptions = SEARCH_OPTIONS;

  constructor(private _facade: StateFacade) {}

  isExtensionChecked(extension: string) {
    return this._facade.getExtensionCheckedState(extension);
  }

  onEdit(command: Command, extension: string) {
    this.edit.emit({ command, extension });
    return false;
  }

  onView(command: Command, extension: string) {
    this.view.emit({ command, extension });
    return false;
  }
}

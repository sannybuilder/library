import { Component, Inject, Input } from '@angular/core';
import { timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { CONFIG, Config } from '../../config';
import { StateFacade } from '../../state/facade';
import { Command, Game, SEARCH_OPTIONS } from '../../models';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent {
  @Input() game: Game;

  extensions$ = this.facade.extensions$;
  loading$ = this.facade.loading$;
  selectedFilters$ = this.facade.selectedFilters$;
  searchTerm$ = this.facade.searchTerm$.pipe(debounce(() => timer(500)));
  searchOptions = SEARCH_OPTIONS;

  constructor(
    public facade: StateFacade,
    @Inject(CONFIG) public config: Config
  ) {}

  isExtensionChecked(extension: string) {
    return this.facade.getExtensionCheckedState(extension);
  }

  edit(command: Command, extension: string) {
    this.facade.editCommandInfo(command, extension);
    return false;
  }

  displayInfo(command: Command, extension: string) {
    this.facade.displayCommandInfo(command, extension);
    return false;
  }
}

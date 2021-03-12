import { Component, Inject, Input } from '@angular/core';
import { timer } from 'rxjs';
import { debounce, map } from 'rxjs/operators';

import { CONFIG, Config } from '../../config';
import { StateFacade } from '../../state/facade';
import { Command, Game, SEARCH_OPTIONS } from '../../models';
import { AuthFacade } from '../../auth/auth.facade';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent {
  @Input() game: Game;

  extensions$ = this._facade.extensions$;
  loading$ = this._facade.loading$;
  selectedFiltersOnly$ = this._facade.selectedFiltersOnly$;
  selectedFiltersExcept$ = this._facade.selectedFiltersExcept$;
  searchTerm$ = this._facade.searchTerm$.pipe(debounce(() => timer(500)));
  editable$ = this._authFacade.isAuthorized$.pipe(
    map((isAuthorized) => isAuthorized && this._config.features.editing)
  );
  searchOptions = SEARCH_OPTIONS;

  constructor(
    private _facade: StateFacade,
    private _authFacade: AuthFacade,
    @Inject(CONFIG) private _config: Config
  ) {}

  isExtensionChecked(extension: string) {
    return this._facade.getExtensionCheckedState(extension);
  }

  edit(command: Command, extension: string) {
    this._facade.editCommandInfo(command, extension);
    return false;
  }

  displayInfo(command: Command, extension: string) {
    this._facade.displayCommandInfo(command, extension);
    return false;
  }
}

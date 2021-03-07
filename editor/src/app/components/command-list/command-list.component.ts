import { Component, ViewChild, Inject, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, ReplaySubject, Subject, timer } from 'rxjs';
import { debounce, filter, map, takeUntil } from 'rxjs/operators';

import { CONFIG, Config } from '../../config';
import { StateFacade } from '../../state/facade';
import { Command, Game, SEARCH_OPTIONS } from '../../models';
import { CommandEditorComponent } from '../command-editor/command-editor.component';
import { CommandInfoComponent } from '../command-info/command-info.component';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent implements OnDestroy {
  @ViewChild(CommandEditorComponent) commandEditor: CommandEditorComponent;
  @ViewChild(CommandInfoComponent) commandInfo: CommandInfoComponent;

  @Input() title: string;
  @Input() game: Game;

  onDestroy$ = new Subject();
  extensions$ = this.facade.extensions$;
  loading$ = this.facade.loading$;
  selectedFilters$ = this.facade.selectedFilters$;
  searchTerm$ = this.facade.searchTerm$;
  searchTermDebounce$ = this.searchTerm$.pipe(debounce(() => timer(500)));
  displayOpcodeInfoOnDemand$ = new ReplaySubject<{
    opcode: string;
    extension: string;
  }>(1);
  displayOpcodeInfo$ = combineLatest([this.extensions$, this.route.data])
    .pipe(
      takeUntil(this.onDestroy$),
      filter(([extensions, { data }]) => !!data.opcode && !!data.extension),
      map(([extensions, { data }]) => ({
        command: extensions
          .find((e) => e.name === data.extension)
          ?.commands.find((command) => command.id === data.opcode),
        extension: data.extension,
      }))
    )
    .subscribe(({ command, extension }) => {
      if (command) {
        this.facade.displayCommandInfo({ command, extension });
      } else {
        this.facade.stopEditOrDisplay();
      }
    });

  searchOptions = SEARCH_OPTIONS;

  constructor(
    public facade: StateFacade,
    @Inject(CONFIG) public config: Config,
    public route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.facade.toggleCommandListElements(false);
  }

  edit(command: Command, extension: string) {
    this.facade.editCommandInfo({ command, extension });
    return false;
  }

  isExtensionChecked(extension: string) {
    return this.facade.getExtensionCheckedState(extension);
  }

  displayInfo(command: Command, extension: string) {
    this.facade.displayCommandInfo({ command, extension });
    return false;
  }
}

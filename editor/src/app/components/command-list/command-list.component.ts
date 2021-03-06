import { Component, ViewChild, OnInit, Inject, OnDestroy } from '@angular/core';
import { combineLatest, ReplaySubject, Subject, timer } from 'rxjs';
import { debounce, filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { omit } from 'lodash';

import { CONFIG, Config } from '../../config';
import { Command, CommandAttributes, Game, ParamType } from '../../models';
import { StateFacade } from '../../state/facade';
import {
  CommandEditorComponent,
  SaveEvent,
} from '../command-editor/command-editor.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommandInfoComponent } from '../command-info/command-info.component';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent implements OnInit, OnDestroy {
  @ViewChild(CommandEditorComponent) commandEditor: CommandEditorComponent;
  @ViewChild(CommandInfoComponent) commandInfo: CommandInfoComponent;

  title: string;
  game: Game;

  onDestroy$ = new Subject();
  extensions$ = this.facade.extensions$;
  editCommand$ = this.facade.editCommand$;
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
      map(([extensions, { data }]) =>
        extensions
          .find((e) => e.name === data.extension)
          ?.commands.find((command) => command.id === data.opcode)
      )
    )
    .subscribe((command) => {
      if (command) {
        this.commandInfo.open(command);
      } else {
        this.commandInfo.close();
      }
    });

  searchOptions = {
    keys: ['name', 'short_desc', 'id', 'class', 'member'],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 3,
    distance: 50,
    fusejsHighlightKey: '_highlight',
  };

  constructor(
    public facade: StateFacade,
    @Inject(CONFIG) public config: Config,
    public route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.onRouteChange();
      });

    this.onRouteChange();
    this.facade.toggleCommandListElements(true);
  }

  onRouteChange() {
    const { data } = this.route.snapshot.data;
    this.title = data.title;
    if (data.game !== this.game) {
      this.game = data.game;
      this.facade.loadExtensions(this.game);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.facade.toggleCommandListElements(false);
  }

  edit(command: Command, extension: string) {
    this.facade.editCommand(command);
    this.getExtensionEntities(extension)
      .pipe(take(1))
      .subscribe((entities) => {
        this.commandEditor.open(command, extension, entities as ParamType[]);
      });

    return false;
  }

  onSave({ command, newExtension, oldExtension }: SaveEvent) {
    this.facade.updateCommand({
      newExtension,
      oldExtension,
      command: omit(command, this.searchOptions.fusejsHighlightKey),
      game: this.game,
    });
  }

  isExtensionChecked(extension: string) {
    return this.facade.getExtensionCheckedState(extension);
  }

  displayInfo(command: Command) {
    this.commandInfo.open(command);
  }

  private getExtensionEntities(extension: string) {
    return this.facade.getExtensionEntities(extension);
  }
}

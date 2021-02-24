import { Component, ViewChild, OnInit, Inject, OnDestroy } from '@angular/core';
import { merge, Observable, Subject, timer } from 'rxjs';
import { debounce, filter, map, takeUntil } from 'rxjs/operators';
import { omit } from 'lodash';

import { CONFIG, Config } from '../../config';
import { Command, Game } from '../../models';
import { StateFacade } from '../../state/facade';
import {
  CommandEditorComponent,
  SaveEvent,
} from '../command-editor/command-editor.component';
import { ActivatedRoute } from '@angular/router';
import { CommandInfoComponent } from '../command-info/command-info.component';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent implements OnInit, OnDestroy {
  @ViewChild(CommandEditorComponent) commandEditor: CommandEditorComponent;
  @ViewChild(CommandInfoComponent) commandInfo: CommandInfoComponent;
  rows: Command[] = [];
  onDestroy$ = new Subject();

  extensions$ = this.facade.extensions$;
  extensionNames$ = this.extensions$.pipe(
    map((extensions) => extensions.map((e) => e.name))
  );
  editCommand$ = this.facade.editCommand$;
  loading$ = this.facade.loading$;

  searchTerms: string;
  searchTerm$ = this.facade.searchTerm$;
  searchTermDebounce$ = this.searchTerm$.pipe(debounce(() => timer(500)));
  exactSearch: boolean = false;
  title: string;
  game: Game;
  displayOpcode?: string;
  displayExtension?: string;

  displayOpcodeInfoOnStart$: Observable<Command> = this.extensions$.pipe(
    filter(
      (extensions) =>
        !!extensions && !!this.displayOpcode && !!this.displayExtension
    ),
    map((extensions) => {
      const extension = extensions.find(
        (e) => e.name === this.displayExtension
      );
      if (extension) {
        const id = parseInt(this.displayOpcode, 16);
        return extension.commands.find((command) => command.id === id);
      }
    }),
    filter<Command>(Boolean)
  );

  displayOpcodeInfoOnDemand$ = new Subject<Command>();

  displayOpcodeInfo$ = merge(
    this.displayOpcodeInfoOnStart$,
    this.displayOpcodeInfoOnDemand$
  )
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((command) => {
      this.commandInfo.open(command);
    });

  searchOptions = {
    keys: ['name', 'short_desc'],
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 3,
    distance: 50,
    fusejsHighlightKey: '_highlight',
  };

  constructor(
    public facade: StateFacade,
    @Inject(CONFIG) public config: Config,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.onDestroy$)).subscribe(({ data }) => {
      this.displayOpcode = data.opcode;
      this.displayExtension = data.extension;
      this.title = data.title;
      if (data.game !== this.game) {
        this.game = data.game;
        this.facade.loadExtensions(this.game);
      }
    });
    this.facade.toggleCommandListElements(true);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.facade.toggleCommandListElements(false);
  }

  edit(command: Command, extension: string, availableExtensions: string[]) {
    this.facade.editCommand(command);
    this.commandEditor.open(command, extension, availableExtensions);
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

  toggleExtension(extenstion: string) {
    this.facade.toggleExtension(extenstion);
  }

  isExtensionChecked(extension: string) {
    return this.facade.getExtensionCheckedState(extension);
  }

  displayInfo(command: Command) {
    this.displayOpcodeInfoOnDemand$.next(command);
  }
}

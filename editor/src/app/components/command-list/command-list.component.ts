import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { omit } from 'lodash';

import { CONFIG, Config } from '../../config';
import { Command } from '../../models';
import { StateFacade } from '../../state/facade';
import { CommandEditorComponent } from '../command-editor/command-editor.component';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent implements OnInit {
  @ViewChild(CommandEditorComponent) commandEditor: CommandEditorComponent;
  rows: Command[] = [];

  commands$ = this.facade.commands$;
  editCommand$ = this.facade.editCommand$;
  loading$ = this.facade.loading$;
  lastUpdate$ = this.facade.lastUpdate$;
  searchTerms: string;
  searchTerm$ = new Subject();
  searchTermDebounce$ = this.searchTerm$.pipe(debounce(() => timer(500)));
  exactSearch: boolean = false;

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
    @Inject(CONFIG) public config: Config
  ) {}

  ngOnInit() {
    this.facade.getCommands();
  }

  edit(command: Command) {
    this.facade.editCommand(command);
    this.commandEditor.open(command);
    return false;
  }

  onSave(command: Command) {
    this.facade.updateCommand(
      omit(command, this.searchOptions.fusejsHighlightKey)
    );
  }

  onSearchUpdate(term: string) {
    this.searchTerm$.next(term);
  }
}

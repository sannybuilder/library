import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Command } from '../models';
import {
  editCommand,
  getCommands,
  updateCommands,
  updateCommand,
} from './actions';
import {
  commandsSelector,
  editCommandSelector,
  lastUpdateSelector,
  loadingSelector,
} from './selectors';

@Injectable({ providedIn: 'root' })
export class StateFacade {
  commands$ = this.store$.select(commandsSelector());
  editCommand$ = this.store$.select(editCommandSelector());
  loading$ = this.store$.select(loadingSelector());
  lastUpdate$ = this.store$.select(lastUpdateSelector());

  constructor(private store$: Store) {}

  getCommands() {
    this.store$.dispatch(getCommands());
  }

  updateCommands(commands: Command[]) {
    this.store$.dispatch(updateCommands({ commands }));
  }

  editCommand(command: Command) {
    this.store$.dispatch(editCommand({ command }));
  }

  updateCommand(command: Command) {
    this.store$.dispatch(updateCommand({ command }));
  }
}

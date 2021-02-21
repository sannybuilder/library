import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Command, Extension } from '../models';
import {
  editCommand,
  loadExtensions,
  updateExtensions,
  updateCommand,
  toggleExtension,
} from './actions';
import {
  extensionsSelector,
  editCommandSelector,
  lastUpdateSelector,
  loadingSelector,
  selectedExtensionsSelector,
} from './selectors';

@Injectable({ providedIn: 'root' })
export class StateFacade {
  extensions$ = this.store$.select(extensionsSelector);
  editCommand$ = this.store$.select(editCommandSelector);
  loading$ = this.store$.select(loadingSelector);
  lastUpdate$ = this.store$.select(lastUpdateSelector);
  getExtensionCheckedState(extension: string) {
    return this.store$.select(selectedExtensionsSelector, { extension });
  }

  constructor(private store$: Store) {}

  loadExtensions() {
    this.store$.dispatch(loadExtensions());
  }

  updateExtensions(extensions: Extension[]) {
    this.store$.dispatch(updateExtensions({ extensions }));
  }

  editCommand(command: Command) {
    this.store$.dispatch(editCommand({ command }));
  }

  updateCommand(command: Command, extension: string) {
    this.store$.dispatch(updateCommand({ command, extension }));
  }

  toggleExtension(extension: string) {
    this.store$.dispatch(toggleExtension({ extension }));
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Extension } from '../../models';
import {
  clearChanges,
  initializeGithub,
  registerExtensionsChange,
  registerSnippetChange,
  submitChanges,
} from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class ChangesFacade {
  changesCount$ = this.store$.select(selector.changesCount);
  lastUpdate$ = this.store$.select(selector.lastUpdate);
  changes$ = this.store$.select(selector.changes);
  github$ = this.store$.select(selector.github);

  constructor(private store$: Store) {}

  registerExtensionsChange(fileName: string, content: Extension[]) {
    this.store$.dispatch(registerExtensionsChange({ fileName, content }));
  }

  registerSnippetChange(fileName: string, content: string) {
    this.store$.dispatch(registerSnippetChange({ fileName, content }));
  }

  clearChanges() {
    this.store$.dispatch(clearChanges());
  }

  submitChanges() {
    this.store$.dispatch(submitChanges());
  }

  initializeGithub(accessToken: string) {
    this.store$.dispatch(initializeGithub({ accessToken }));
  }
}

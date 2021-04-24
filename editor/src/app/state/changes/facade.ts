import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Enums, Extension } from '../../models';
import {
  clearChanges,
  initializeGithub,
  registerExtensionsChange,
  registerSnippetChange,
  registerEnumChange,
  submitChanges,
} from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class ChangesFacade {
  changesCount$ = this.store$.select(selector.changesCount);
  isUpdating$ = this.store$.select(selector.isUpdating);
  changes$ = this.store$.select(selector.changes);
  github$ = this.store$.select(selector.github);

  constructor(private store$: Store) {}

  registerExtensionsChange(fileName: string, content: Extension[]) {
    this.store$.dispatch(registerExtensionsChange({ fileName, content }));
  }

  registerSnippetChange(fileName: string, content: string) {
    this.store$.dispatch(registerSnippetChange({ fileName, content }));
  }

  registerEnumChange(fileName: string, content: Enums) {
    this.store$.dispatch(registerEnumChange({ fileName, content }));
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

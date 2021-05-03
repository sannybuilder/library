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
  registerFileContent,
} from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class ChangesFacade {
  hasChanges$ = this.store$.select(selector.hasChanges);
  isUpdating$ = this.store$.select(selector.isUpdating);
  changes$ = this.store$.select(selector.changes);
  snapshots$ = this.store$.select(selector.snapshots);
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

  registerFileContent({
    fileName,
    lastUpdate,
    content,
  }: {
    fileName: string;
    lastUpdate: number;
    content: string;
  }) {
    this.store$.dispatch(
      registerFileContent({ fileName, lastUpdate, content })
    );
  }
}

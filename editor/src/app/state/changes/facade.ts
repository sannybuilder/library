import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassMeta, Enums, Extension, Game } from '../../models';
import {
  clearChanges,
  initializeGithub,
  registerExtensionsChange,
  registerTextFileChange,
  registerEnumChange,
  submitChanges,
  registerFileContent,
  loadLastRevision,
  loadGitTree,
} from './actions';
import * as selector from './selectors';
import { filter, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChangesFacade {
  hasChanges$ = this.store$.select(selector.hasChanges);
  isUpdating$ = this.store$.select(selector.isUpdating);
  changes$ = this.store$.select(selector.changes);
  snapshots$ = this.store$.select(selector.snapshots);
  github$ = this.store$.select(selector.github);
  lastRevision$ = this.store$.select(selector.lastRevision);
  tree$ = this.store$.select(selector.tree);

  constructor(private store$: Store) {}

  registerExtensionsChange({
    fileName,
    version,
    url,
    content,
    classesMeta,
    game,
  }: {
    fileName: string;
    version: string;
    url: string;
    content: Extension[];
    classesMeta: ClassMeta[];
    game: Game;
  }) {
    this.store$.dispatch(
      registerExtensionsChange({
        fileName,
        version,
        url,
        content,
        classesMeta,
        game,
      })
    );
  }

  registerTextFileChange(fileName: string, content: string) {
    this.store$.dispatch(registerTextFileChange({ fileName, content }));
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

  initializeGithub(accessToken: string | undefined) {
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

  loadLastRevision() {
    this.store$.dispatch(loadLastRevision());
  }

  loadGitTree() {
    this.store$.dispatch(loadGitTree());
  }
}

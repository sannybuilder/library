import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClassesMeta, Enums, Extension } from '../../models';
import {
  clearChanges,
  initializeGithub,
  registerExtensionsChange,
  registerTextFileChange,
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

  registerExtensionsChange({
    fileName,
    version,
    url,
    content,
    classesMeta,
  }: {
    fileName: string;
    version: string;
    url: string;
    content: Extension[];
    classesMeta: ClassesMeta;
  }) {
    this.store$.dispatch(
      registerExtensionsChange({ fileName, version, url, content, classesMeta })
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
}

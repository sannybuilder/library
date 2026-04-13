import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadMainFile,
  loadScmFile,
  loadScmMap,
  selectScmLabelOffset,
} from './actions';
import * as selector from './selectors';
import { Game } from '../../models';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScmFacade {
  activeFileName$ = this.store$.select(selector.activeFileName);
  currentFile$ = this.store$.select(selector.currentFile);
  files$ = this.store$.select(selector.files);
  overlay$ = this.store$.select(selector.currentOverlay);
  map$ = this.store$
    .select(selector.currentMap)
    .pipe(filter((v): v is NonNullable<typeof v> => !!v));
  tree$ = this.store$.select(selector.currentTree);
  currentFileLabelOffsets$ = this.store$.select(
    selector.currentFileLabelOffsets,
  );
  xrefs$ = this.store$.select(selector.currentXrefs);
  refs$ = this.store$.select(selector.currentRefs);

  constructor(private store$: Store) {}

  loadFile(name: string) {
    return this.store$.dispatch(loadScmFile({ name }));
  }

  loadMainFile() {
    return this.store$.dispatch(loadMainFile());
  }

  loadMap(game: Game) {
    return this.store$.dispatch(loadScmMap({ game }));
  }

  selectLabelOffset(offset: number) {
    return this.store$.dispatch(selectScmLabelOffset({ offset }));
  }

  mapByGame$(game: Game) {
    return this.store$.select(selector.mapByGame, { game });
  }

  treeByGame$(game: Game) {
    return this.store$.select(selector.treeByGame, { game });
  }

  xrefsByGame$(game: Game) {
    return this.store$.select(selector.xrefsByGame, { game });
  }

  fileByName$(name: string) {
    return this.store$.select(selector.fileByName, { name });
  }

  overlayByGame$(game: Game) {
    return this.store$.select(selector.overlayByGame, { game });
  }
}

import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadMainFile,
  loadScmFile,
  loadScmMap,
  selectScmLabelOffset,
  updateScmRefs,
  updateScmVariables,
} from './actions';
import * as selector from './selectors';
import { Game } from '../../models';
import { filter } from 'rxjs/operators';
import { KeyValueEntry } from '../../components/scm/model';

@Injectable({ providedIn: 'root' })
export class ScmFacade {
  private store$ = inject(Store);

  activeFileName$ = this.store$.select(selector.activeFileName);
  currentFile$ = this.store$.select(selector.currentFile);
  files$ = this.store$.select(selector.files);
  map$ = this.store$
    .select(selector.currentMap)
    .pipe(filter((v): v is NonNullable<typeof v> => !!v));
  tree$ = this.store$.select(selector.currentTree);
  currentFileLabelOffsets$ = this.store$.select(
    selector.currentFileLabelOffsets,
  );
  xrefs$ = this.store$.select(selector.currentXrefs);
  refs$ = this.store$.select(selector.currentRefs);
  refsOverlay$ = this.store$.select(selector.currentRefsOverlay);
  variablesOverlay$ = this.store$.select(selector.currentVariablesOverlay);

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

  updateRefs(refs: KeyValueEntry[]) {
    return this.store$.dispatch(updateScmRefs({ refs }));
  }

  updateVariables(variables: KeyValueEntry[]) {
    return this.store$.dispatch(updateScmVariables({ variables }));
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

  refsByGame$(game: Game) {
    return this.store$.select(selector.refsByGame, { game });
  }

  variablesByGame$(game: Game) {
    return this.store$.select(selector.variablesByGame, { game });
  }
}

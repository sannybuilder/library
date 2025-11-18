import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StructRaw, Game } from '../../models';
import { cloneStruct, loadStructs, updateStruct } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class StructsFacade {
  structs$ = this.store$.select(selector.structs);
  structNames$ = this.store$.select(selector.structNames);

  constructor(private store$: Store) {}

  loadStructs(game: Game) {
    return this.store$.dispatch(loadStructs({ game }));
  }

  getGameStructs(game: Game) {
    return this.store$.select(selector.gameStructs, { game });
  }

  getGamesWhereStructExists(structName: string) {
    return this.store$.select(selector.gamesWhereExist, { structName });
  }

  updateStruct({
    structToEdit,
    oldStructToEdit,
  }: {
    structToEdit: StructRaw;
    oldStructToEdit: StructRaw;
  }) {
    this.store$.dispatch(updateStruct({ structToEdit, oldStructToEdit }));
  }

  cloneStruct({ structToClone, game }: { structToClone: StructRaw; game: Game }) {
    this.store$.dispatch(cloneStruct({ structToClone, game }));
  }
}

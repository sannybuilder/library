import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnumRaw, Game } from '../../models';
import { cloneEnum, loadEnums, loadEnumsInfo, updateEnum } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class EnumsFacade {
  enums$ = this.store$.select(selector.enums);
  enumNames$ = this.store$.select(selector.enumNames);

  constructor(private store$: Store) {}

  loadEnums(game: Game) {
    return this.store$.dispatch(loadEnums({ game }));
  }

  getGameEnums(game: Game) {
    return this.store$.select(selector.gameEnums, { game });
  }

  getEnumFields(enumName: string) {
    return this.store$.select(selector.enumFields, {
      enumName,
    });
  }

  getGamesWhereEnumExists(enumName: string) {
    return this.store$.select(selector.gamesWhereExist, { enumName });
  }

  updateEnum({
    enumToEdit,
    oldEnumToEdit,
  }: {
    enumToEdit: EnumRaw;
    oldEnumToEdit: EnumRaw;
  }) {
    this.store$.dispatch(updateEnum({ enumToEdit, oldEnumToEdit }));
  }

  cloneEnum({ enumToClone, game }: { enumToClone: EnumRaw; game: Game }) {
    this.store$.dispatch(cloneEnum({ enumToClone, game }));
  }

  loadEnumsInfo() {
    this.store$.dispatch(loadEnumsInfo());
  }
}

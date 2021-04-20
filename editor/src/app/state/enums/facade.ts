import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game } from '../../models';
import { loadEnums } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class EnumsFacade {
  enums$ = this.store$.select(selector.enums);
  enumNames$ = this.store$.select(selector.enumNames);

  constructor(private store$: Store) {}

  loadEnums(game: Game) {
    return this.store$.dispatch(loadEnums({ game }));
  }

  getEnumFields(enumName: string) {
    return this.store$.select(selector.enumFields, {
      enumName,
    });
  }
}

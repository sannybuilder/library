import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isEqual } from 'lodash';
import {
  concatMap,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  loadEnums,
  loadEnumsSuccess,
  updateEnum,
  updateGameEnum,
} from './actions';
import { GameFacade } from '../game/facade';
import { EnumsService } from './service';
import { ChangesFacade } from '../changes/facade';
import { EnumsFacade } from './facade';
import { GameEnums } from '../../models';

@Injectable({ providedIn: 'root' })
export class EnumsEffects {
  loadEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadEnums),
      concatMap(({ game }) =>
        this._service
          .loadEnums(game)
          .pipe(map((enums) => loadEnumsSuccess({ game, enums })))
      )
    )
  );

  updateEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateEnum),
      distinctUntilChanged(isEqual),
      withLatestFrom(this._game.game$),
      map(([{ enumToEdit, oldEnumToEdit }, game]) =>
        updateGameEnum({
          game,
          enumToEdit,
          oldEnumToEdit,
        })
      )
    )
  );

  updateGameEnums$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateGameEnum),
        distinctUntilChanged<ReturnType<typeof updateGameEnum>>(isEqual),
        switchMap(({ game }) =>
          this._enums.getGameEnums(game).pipe(
            tap((enums) => {
              this._changes.registerEnumChange(GameEnums[game], enums);
            })
          )
        )
      ),
    { dispatch: false }
  );
  constructor(
    private _actions$: Actions,
    private _game: GameFacade,
    private _service: EnumsService,
    private _changes: ChangesFacade,
    private _enums: EnumsFacade
  ) {}
}

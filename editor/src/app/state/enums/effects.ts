import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concatMap,
  distinctUntilChanged,
  filter,
  groupBy,
  map,
  switchMap,
  tap,
  withLatestFrom,
  take,
  catchError,
} from 'rxjs/operators';

import {
  cloneEnum,
  loadEnums,
  loadEnumsSuccess,
  renameGameEnum,
  updateEnum,
  updateGameEnum,
  loadEnumsInfo,
  loadEnumsInfoSuccess,
  loadEnumsError,
} from './actions';
import { GameFacade } from '../game/facade';
import { EnumsService } from './service';
import { ChangesFacade } from '../changes/facade';
import { EnumsFacade } from './facade';
import { GameEnums } from '../../models';
import { AuthFacade } from '../auth/facade';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { isEqual } from 'lodash';

@Injectable({ providedIn: 'root' })
export class EnumsEffects {
  enums$ = createEffect(() =>
    this._game.game$.pipe(
      // for each requested game, load enum file once
      groupBy((game) => game),
      concatMap((group$) => group$.pipe(take(1))),
      map((game) => loadEnums({ game }))
    )
  );

  loadEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadEnums),
      distinctUntilChanged((a, b) => GameEnums[a.game] === GameEnums[b.game]),
      withLatestFrom(this._auth.authToken$),
      concatMap(([{ game }, accessToken]) =>
        this._service.loadEnums(game, accessToken).pipe(
          map((enums) => loadEnumsSuccess({ game, enums })),
          catchError(() => of(loadEnumsError()))
        )
      )
    )
  );

  updateEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateEnum),
      // distinctUntilChanged(isEqual),
      filter(({ enumToEdit, oldEnumToEdit }) => {
        return !isEqual(enumToEdit.fields, oldEnumToEdit.fields);
      }),
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

  // the rename effect must go after the update effect
  // because if we rename and change an enum at the same time
  // existing enum fields should updated before the enum renamed, 
  // or we get a duplicate
  renameGameEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateEnum),
      filter(
        ({ enumToEdit, oldEnumToEdit }) =>
          enumToEdit.name !== oldEnumToEdit.name
      ),
      withLatestFrom(this._game.game$),
      map(([{ enumToEdit, oldEnumToEdit }, game]) =>
        renameGameEnum({
          game,
          newEnumName: enumToEdit.name,
          oldEnumName: oldEnumToEdit.name,
          isAffected: false,
        })
      )
    )
  );

  // prepare updated or renamed enum for submit
  updateGameEnums$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateGameEnum, renameGameEnum),
        switchMap(({ game }) =>
          this._enums.getGameEnums(game).pipe(
            take(1),
            tap((enums) => {
              this._changes.registerEnumChange(GameEnums[game], enums);
            })
          )
        )
      ),
    { dispatch: false }
  );

  cloneEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(cloneEnum),
      tap(({ game, enumToClone }) => {
        this._router.navigate(['/', game, 'enums', enumToClone.name]);
      }),
      map(({ game, enumToClone }) =>
        updateGameEnum({
          game,
          enumToEdit: enumToClone,
          oldEnumToEdit: enumToClone,
        })
      )
    )
  );

  loadEnumsInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadEnumsInfo),
      switchMap(() =>
        this._service.loadEnumsInfo().pipe(
          map((data) => loadEnumsInfoSuccess({ data })),
          catchError(() => of(loadEnumsError()))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _game: GameFacade,
    private _service: EnumsService,
    private _changes: ChangesFacade,
    private _enums: EnumsFacade,
    private _auth: AuthFacade,
    private _router: Router
  ) {}
}

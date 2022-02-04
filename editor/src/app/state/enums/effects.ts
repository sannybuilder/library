import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concatMap,
  distinctUntilChanged,
  filter,
  first,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  cloneEnum,
  loadEnums,
  loadEnumsSuccess,
  renameGameEnum,
  updateEnum,
  updateGameEnum,
} from './actions';
import { GameFacade } from '../game/facade';
import { EnumsService } from './service';
import { ChangesFacade } from '../changes/facade';
import { EnumsFacade } from './facade';
import { GameEnums } from '../../models';
import { AuthFacade } from '../auth/facade';
import { ExtensionsFacade } from '../extensions/facade';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EnumsEffects {
  enums$ = createEffect(() =>
    this._game.game$.pipe(
      switchMap((game) =>
        this._extensions.getGameExtensions(game).pipe(
          first((e) => !e.length),
          map(() => loadEnums({ game }))
        )
      )
    )
  );

  loadEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadEnums),
      distinctUntilChanged((a, b) => GameEnums[a.game] === GameEnums[b.game]),
      withLatestFrom(this._auth.authToken$),
      concatMap(([{ game }, accessToken]) =>
        this._service
          .loadEnums(game, accessToken)
          .pipe(map((enums) => loadEnumsSuccess({ game, enums })))
      )
    )
  );

  updateEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateEnum),
      // distinctUntilChanged(isEqual),
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

  renameGameEnums$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateGameEnum),
      filter(
        ({ enumToEdit, oldEnumToEdit }) =>
          enumToEdit.name !== oldEnumToEdit.name
      ),
      map(({ game, enumToEdit, oldEnumToEdit }) =>
        renameGameEnum({
          game,
          newEnumName: enumToEdit.name,
          oldEnumName: oldEnumToEdit.name,
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

  constructor(
    private _actions$: Actions,
    private _game: GameFacade,
    private _service: EnumsService,
    private _changes: ChangesFacade,
    private _enums: EnumsFacade,
    private _extensions: ExtensionsFacade,
    private _auth: AuthFacade,
    private _router: Router
  ) {}
}

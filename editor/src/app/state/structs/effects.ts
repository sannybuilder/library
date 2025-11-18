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
  cloneStruct,
  loadStructs,
  loadStructsSuccess,
  renameGameStruct,
  updateStruct,
  updateGameStruct,
  loadStructsError,
} from './actions';
import { GameFacade } from '../game/facade';
import { StructsService } from './service';
import { ChangesFacade } from '../changes/facade';
import { StructsFacade } from './facade';
import { GameStructs, Structs, ViewContext } from '../../models';
import { AuthFacade } from '../auth/facade';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { isEqual } from 'lodash';

@Injectable({ providedIn: 'root' })
export class StructsEffects {
  structs$ = createEffect(() =>
    this._game.game$.pipe(
      // for each requested game, load struct file once
      groupBy((game) => game),
      concatMap((group$) => group$.pipe(take(1))),
      map((game) => loadStructs({ game }))
    )
  );

  viewContexts$ = createEffect(() =>
    this._game.viewContext$.pipe(
      distinctUntilChanged(),
      withLatestFrom(this._game.game$),
      map(([_, game]) =>
        loadStructs({
          game,
        })
      )
    )
  );

  loadStructs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadStructs),
      withLatestFrom(this._game.viewContext$, this._auth.authToken$),
      filter(([_, viewContext]) => viewContext === ViewContext.Code),
      distinctUntilChanged(
        ([a, ea], [b, eb]) =>
          GameStructs[a.game] === GameStructs[b.game] && ea === eb
      ),
      concatMap(([{ game }, viewContext, accessToken]) =>
        this._service.loadStructs(game, accessToken).pipe(
          map((structs: Structs) => loadStructsSuccess({ game, structs })),
          catchError(() => of(loadStructsError({ game })))
        )
      )
    )
  );

  updateStructs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateStruct),
      filter(({ structToEdit, oldStructToEdit }) => {
        return !isEqual(structToEdit.fields, oldStructToEdit.fields);
      }),
      withLatestFrom(this._game.game$),
      map(([{ structToEdit, oldStructToEdit }, game]) =>
        updateGameStruct({
          game,
          structToEdit,
          oldStructToEdit,
        })
      )
    )
  );

  // the rename effect must go after the update effect
  // because if we rename and change a struct at the same time
  // existing struct fields should updated before the struct renamed,
  // or we get a duplicate
  renameGameStructs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateStruct),
      filter(
        ({ structToEdit, oldStructToEdit }) =>
          structToEdit.name !== oldStructToEdit.name
      ),
      withLatestFrom(this._game.game$),
      map(([{ structToEdit, oldStructToEdit }, game]) =>
        renameGameStruct({
          game,
          newStructName: structToEdit.name,
          oldStructName: oldStructToEdit.name,
          isAffected: false,
        })
      )
    )
  );

  // prepare updated or renamed struct for submit
  updateGameStructs$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateGameStruct, renameGameStruct),
        switchMap(({ game }) =>
          this._structs.getGameStructs(game).pipe(
            take(1),
            tap((structs) => {
              this._changes.registerStructChange(GameStructs[game], structs);
            })
          )
        )
      ),
    { dispatch: false }
  );

  cloneStructs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(cloneStruct),
      tap(({ game, structToClone }) => {
        this._router.navigate([
          '/',
          game,
          'native',
          'structs',
          structToClone.name,
        ]);
      }),
      map(({ game, structToClone }) =>
        updateGameStruct({
          game,
          structToEdit: structToClone,
          oldStructToEdit: structToClone,
        })
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _game: GameFacade,
    private _service: StructsService,
    private _changes: ChangesFacade,
    private _structs: StructsFacade,
    private _auth: AuthFacade,
    private _router: Router
  ) {}
}

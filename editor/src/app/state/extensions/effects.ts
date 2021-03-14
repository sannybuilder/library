import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadExtensions,
  loadExtensionsSuccess,
  submitChanges,
  submitChangesSuccess,
} from './actions';
import { ExtensionsService } from './service';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ExtensionsFacade } from './facade';
import { UiFacade } from '../ui/facade';

@Injectable()
export class ExtensionsEffects {
  loadExtensions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExtensions),
      switchMap(({ game }) =>
        this.service
          .loadExtensions(game)
          .pipe(
            map(({ extensions, lastUpdate }) =>
              loadExtensionsSuccess({ extensions, lastUpdate })
            )
          )
      )
    )
  );

  submitChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitChanges),
      withLatestFrom(this._extensions.extensions$, this._ui.game$),
      switchMap(([_, extensions, game]) =>
        this.service
          .saveChanges(game, extensions)
          .pipe(map(({ lastUpdate }) => submitChangesSuccess({ lastUpdate })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _extensions: ExtensionsFacade,
    private service: ExtensionsService,
    private _ui: UiFacade
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadExtensions,
  loadExtensionsSuccess,
  updateCommand,
} from './actions';
import { ExtensionsService } from './service';
import { map, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ExtensionsFacade } from './facade';
import { UiFacade } from '../ui/facade';
import { ChangesFacade } from '../changes/facade';

@Injectable({ providedIn: 'root' })
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

  updateCommands$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCommand),
        withLatestFrom(this._extensions.extensions$, this._ui.game$),
        tap(([_, extensions, game]) => {
          this._changes.registerExtensionsChange(extensions, game);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _extensions: ExtensionsFacade,
    private service: ExtensionsService,
    private _ui: UiFacade,
    private _changes: ChangesFacade
  ) {}
}

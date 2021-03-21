import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  tap,
  switchMap,
  withLatestFrom,
  distinctUntilChanged,
} from 'rxjs/operators';
import { isEqual } from 'lodash';

import {
  loadExtensions,
  loadExtensionsSuccess,
  updateCommand,
} from './actions';
import { ExtensionsService } from './service';
import { ExtensionsFacade } from './facade';
import { UiFacade } from '../ui/facade';
import { ChangesFacade } from '../changes/facade';
import { GameLibrary } from '../../models';
import { updateLastUpdateTime } from '../ui/actions';

@Injectable({ providedIn: 'root' })
export class ExtensionsEffects {
  loadExtensions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExtensions),
      switchMap(({ game }) =>
        this.service
          .loadExtensions(game)
          .pipe(
            switchMap(({ extensions, lastUpdate }) => [
              loadExtensionsSuccess({ extensions }),
              updateLastUpdateTime({ lastUpdate }),
            ])
          )
      )
    )
  );

  updateCommands$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCommand),
        distinctUntilChanged(isEqual),
        withLatestFrom(this._extensions.extensions$, this._ui.game$),
        tap(([_, extensions, game]) => {
          this._changes.registerExtensionsChange(GameLibrary[game], extensions);
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

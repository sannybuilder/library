import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from } from 'rxjs';
import {
  distinctUntilChanged,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  reloadPage,
  submitChanges,
  submitChangesFail,
  submitChangesSuccess,
} from './actions';
import { ChangesFacade } from './facade';
import { Config, CONFIG } from '../../config';

@Injectable({ providedIn: 'root' })
export class ChangesEffects {
  submitChanges$ = createEffect(() =>
    this._actions$.pipe(
      ofType(submitChanges),
      withLatestFrom(this._facade.changes$, this._facade.github$),
      distinctUntilChanged((a, b) => a[1] === b[1]),
      switchMap(([_, changes, github]) => {
        if (!github) {
          if (!this._config.features.shouldBeAuthorizedToEdit) {
            console.log('Submit changes');
            console.table(changes);
            return [submitChangesSuccess()];
          } else {
            console.error(
              'Must be logged into GitHub in order to submit changes!'
            );
            return [submitChangesFail()];
          }
        }

        const files = [...changes.entries()].map(([path, content]) => ({
          path,
          content,
        }));
        return from(github.writeFiles(files)).pipe(
          switchMap(() => [submitChangesSuccess(), reloadPage()])
        );
      })
    )
  );

  reloadPage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(reloadPage),
        tap(() => {
          // reloading page to ensure we pull the latest files
          window.location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _facade: ChangesFacade,
    @Inject(CONFIG) private _config: Config
  ) {}
}

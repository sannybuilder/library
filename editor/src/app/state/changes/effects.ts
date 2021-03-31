import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  distinctUntilChanged,
  mapTo,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { reloadPage, submitChanges, submitChangesSuccess } from './actions';
import { ChangesFacade } from '../changes/facade';
import { Config, CONFIG } from '../../config';

@Injectable({ providedIn: 'root' })
export class ChangesEffects {
  submitChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitChanges),
      withLatestFrom(this._facade.changes$),
      distinctUntilChanged((a, b) => a[1] === b[1]),
      switchMap(([_, changes]) =>
        this._facade.github$.pipe(
          take(1),
          switchMap((github) => {
            if (!github && !this._config.features.shouldBeAuthorizedToEdit) {
              console.log('Submit changes');
              console.table(changes);
              return of(false);
            }
            const files = [...changes.entries()].map(([path, content]) => ({
              path,
              content,
            }));
            return from(github.writeFiles(files)).pipe(mapTo(true));
          })
        )
      ),
      switchMap((shouldReload) =>
        [
          submitChangesSuccess(),
          shouldReload ? reloadPage() : undefined,
        ].filter(Boolean)
      )
    )
  );

  reloadPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(reloadPage),
        tap(() => {
          // reloading page to ensure we pull the latest files
          window.location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _facade: ChangesFacade,
    @Inject(CONFIG) private _config: Config
  ) {}
}

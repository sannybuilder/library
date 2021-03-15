import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { submitChanges, submitChangesSuccess } from './actions';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ChangesFacade } from '../changes/facade';
import { from, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChangesEffects {
  submitChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitChanges),
      withLatestFrom(this._facade.changes$, this._facade.github$),
      switchMap(([_, changes, github]) => {
        const files = [...changes.entries()].map(([path, content]) => ({
          path,
          content,
        }));
        return from(github.writeFiles(files));
      }),
      map(() => submitChangesSuccess({ lastUpdate: Date.now() }))
    )
  );

  constructor(private actions$: Actions, private _facade: ChangesFacade) {}
}

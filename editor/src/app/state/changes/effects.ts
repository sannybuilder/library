import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { submitChanges, submitChangesSuccess } from './actions';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { ChangesFacade } from '../changes/facade';
import { from, of } from 'rxjs';
import { Config, CONFIG } from '../../config';

@Injectable({ providedIn: 'root' })
export class ChangesEffects {
  submitChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitChanges),
      withLatestFrom(this._facade.changes$),
      switchMap(([_, changes]) =>
        this._facade.github$.pipe(
          take(1),
          switchMap((github) => {
            if (!github && !this._config.features.shouldBeAuthorizedToEdit) {
              console.log('Submit changes');
              console.table(changes);
              return of();
            }
            const files = [...changes.entries()].map(([path, content]) => ({
              path,
              content,
            }));
            return from(github.writeFiles(files));
          })
        )
      ),
      map(() => submitChangesSuccess())
    )
  );

  constructor(
    private actions$: Actions,
    private _facade: ChangesFacade,
    @Inject(CONFIG) private _config: Config
  ) {}
}

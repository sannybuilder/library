import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadExtensions,
  loadExtensionsSuccess,
  updateCommand,
  updateExtensions,
  updateExtensionsSuccess,
} from './actions';
import { CommandsService } from './service';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { StateFacade } from './facade';

@Injectable()
export class StateEffects {
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

  updateExtensions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateExtensions),
      switchMap(({ extensions, game }) =>
        this.service
          .updateExtensions(game, extensions)
          .pipe(
            map(({ lastUpdate }) => updateExtensionsSuccess({ lastUpdate }))
          )
      )
    )
  );

  updateCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommand),
      withLatestFrom(this.facade.extensions$),
      map(([{ game }, extensions]) => updateExtensions({ extensions, game }))
    )
  );

  constructor(
    private actions$: Actions,
    private facade: StateFacade,
    private service: CommandsService
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getCommands,
  getCommandsError,
  getCommandsSuccess,
  updateCommand,
  updateCommands,
  updateCommandsSuccess,
} from './actions';
import { CommandsService } from './service';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { StateFacade } from './facade';

@Injectable()
export class StateEffects {
  loadCommands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommands),
      switchMap(() =>
        this.service
          .loadCommands()
          .pipe(
            map(({ commands, lastUpdate }) =>
              getCommandsSuccess({ commands, lastUpdate })
            )
          )
      )
    )
  );

  updateCommands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommands),
      switchMap(({ commands }) =>
        this.service
          .updateCommands(commands)
          .pipe(map(({ lastUpdate }) => updateCommandsSuccess({ lastUpdate })))
      )
    )
  );

  updateCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommand),
      withLatestFrom(this.facade.commands$),
      map(([_, commands]) => updateCommands({ commands }))
    )
  );

  constructor(
    private actions$: Actions,
    private facade: StateFacade,
    private service: CommandsService
  ) {}
}

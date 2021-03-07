import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  displayOrEditCommandInfo,
  loadExtensions,
  loadExtensionsSuccess,
  stopEditOrDisplay,
  updateCommand,
  updateExtensions,
  updateExtensionsSuccess,
} from './actions';
import { CommandsService } from './service';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { StateFacade } from './facade';
import { Game, ViewMode } from '../models';
import { combineLatest } from 'rxjs';

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
      withLatestFrom(this.facade.extensions$, this.facade.game$),
      map(([_, extensions, game]) => updateExtensions({ extensions, game }))
    )
  );

  viewOpcodeOnLoad$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(loadExtensionsSuccess)),
      this.facade.opcodeOnLoad$,
    ]).pipe(
      map(([{ extensions }, { opcode, extension }]) => {
        const command = extensions
          .find((e) => e.name === extension)
          ?.commands.find((command) => command.id === opcode);

        if (command) {
          return displayOrEditCommandInfo({
            command,
            extension,
            viewMode: ViewMode.View,
          });
        } else {
          return stopEditOrDisplay();
        }
      })
    )
  );

  onGameChange$ = createEffect(() =>
    this.facade.game$.pipe(
      filter<Game>(Boolean),
      distinctUntilChanged(),
      map((game) => loadExtensions({ game }))
    )
  );

  constructor(
    private actions$: Actions,
    private facade: StateFacade,
    private service: CommandsService
  ) {}
}

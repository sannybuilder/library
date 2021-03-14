import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  displayOrEditCommandInfo,
  loadExtensions,
  loadExtensionsSuccess,
  stopEditOrDisplay,
  updateCommand,
  submitChanges,
  submitChangesSuccess,
  loadSnippets,
  loadSnippetsSuccess,
} from './actions';
import { CommandsService } from './service';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { StateFacade } from './facade';
import { ViewMode } from '../models';
import { combineLatest } from 'rxjs';

@Injectable()
export class RootEffects {
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

  loadSnippets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSnippets),
      switchMap(({ game }) =>
        this.service
          .loadSnippets(game)
          .pipe(
            map((extensionSnippets) =>
              loadSnippetsSuccess({ extensionSnippets })
            )
          )
      )
    )
  );

  submitChanges$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitChanges),
      withLatestFrom(this.facade.extensions$, this.facade.game$),
      switchMap(([_, extensions, game]) =>
        this.service
          .saveChanges(game, extensions)
          .pipe(map(({ lastUpdate }) => submitChangesSuccess({ lastUpdate })))
      )
    )
  );

  updateCommand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommand),
      map(({ command, newExtension: extension }) =>
        displayOrEditCommandInfo({
          command,
          extension,
          viewMode: ViewMode.Edit,
        })
      )
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
      switchMap((game) => [loadExtensions({ game }), loadSnippets({ game })])
    )
  );

  constructor(
    private actions$: Actions,
    private facade: StateFacade,
    private service: CommandsService
  ) {}
}

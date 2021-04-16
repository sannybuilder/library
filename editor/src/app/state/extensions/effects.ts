import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  tap,
  switchMap,
  withLatestFrom,
  distinctUntilChanged,
  concatMap,
  take,
  map,
} from 'rxjs/operators';
import { isEqual } from 'lodash';

import {
  loadExtensions,
  loadExtensionsSuccess,
  updateCommand,
  updateGameCommand,
} from './actions';
import { ExtensionsService } from './service';
import { ExtensionsFacade } from './facade';
import { UiFacade } from '../ui/facade';
import { ChangesFacade } from '../changes/facade';
import { GameLibrary, GameSupportInfo } from '../../models';
import { getSameCommands, isAnyAttributeInvalid } from '../../utils';
import { AuthFacade } from '../auth/facade';

@Injectable({ providedIn: 'root' })
export class ExtensionsEffects {
  loadExtensions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExtensions),
      withLatestFrom(this._auth.authToken$),
      concatMap(([{ game }, accessToken]) =>
        this.service
          .loadExtensions(game, accessToken)
          .pipe(
            map(({ extensions, lastUpdate }) =>
              loadExtensionsSuccess({ game, extensions, lastUpdate })
            )
          )
      )
    )
  );

  updateCommands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCommand),
      distinctUntilChanged(isEqual),
      withLatestFrom(this._ui.game$),
      switchMap(([{ command, newExtension, oldExtension }, game]) => {
        return this._ui.getCommandSupportInfo(command, oldExtension).pipe(
          take(1),
          switchMap((supportInfo: GameSupportInfo[]) =>
            getSameCommands(supportInfo, game).map((d) =>
              updateGameCommand({
                command,
                game: d.game,
                newExtension,
                oldExtension,
              })
            )
          )
        );
      })
    )
  );

  updateGameCommands$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateGameCommand),
        distinctUntilChanged<ReturnType<typeof updateGameCommand>>(isEqual),
        switchMap(({ game }) =>
          this._extensions.getGameExtensions(game).pipe(
            tap((extensions) => {
              this._changes.registerExtensionsChange(
                GameLibrary[game],
                extensions
              );
            })
          )
        )
      ),
    { dispatch: false }
  );

  validateExtensions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadExtensionsSuccess),
        tap(({ extensions }) => {
          extensions.forEach((extension) =>
            extension.commands.forEach((command) => {
              if (isAnyAttributeInvalid(command)) {
                console.warn(
                  `Invalid combination of attributes: extension ${extension.name}, opcode: ${command.id}`
                );
              }
            })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private _extensions: ExtensionsFacade,
    private service: ExtensionsService,
    private _ui: UiFacade,
    private _changes: ChangesFacade,
    private _auth: AuthFacade
  ) {}
}

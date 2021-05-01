import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, zip } from 'rxjs';
import { tap, switchMap, withLatestFrom, concatMap, map } from 'rxjs/operators';
import { flatMap, groupBy, flatten } from 'lodash';

import {
  cloneCommand,
  GameCommandUpdate,
  loadExtensions,
  loadExtensionsSuccess,
  updateCommands,
  updateGameCommands,
} from './actions';
import { ExtensionsService } from './service';
import { ExtensionsFacade } from './facade';
import { ChangesFacade } from '../changes/facade';
import {
  Game,
  GameLibrary,
  GameSupportInfo,
  PrimitiveType,
} from '../../models';
import {
  commandParams,
  getSameCommands,
  isAnyAttributeInvalid,
  replaceType,
} from '../../utils';
import { AuthFacade } from '../auth/facade';
import { GameFacade } from '../game/facade';
import { renameGameEnum } from '../enums/actions';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ExtensionsEffects {
  loadExtensions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadExtensions),
      withLatestFrom(this._auth.authToken$),
      concatMap(([{ game }, accessToken]) =>
        this._service
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
    this._actions$.pipe(
      ofType(updateCommands),
      withLatestFrom(this._game.game$),
      switchMap(([{ batch }, game]) => {
        return zip(
          ...batch.map(({ command, newExtension, oldExtension }) => {
            // find copies of this command in other games to propagate the changes
            if (command.id && command.name) {
              return this._game
                .getCommandSupportInfo(command, oldExtension)
                .pipe(
                  // take(1),
                  map((supportInfo: GameSupportInfo[]) =>
                    getSameCommands(supportInfo, game).map((d) => ({
                      game: d.game,
                      command,
                      newExtension,
                      oldExtension,
                    }))
                  )
                );
            } else {
              // if there is no id or name (deleting flow) - update only this game
              return of([
                {
                  game,
                  command,
                  newExtension,
                  oldExtension,
                },
              ]);
            }
          })
        );
      }),
      switchMap((updates) => {
        const groups = groupBy(flatten(updates), 'game');

        return Object.entries(groups).map(([game, batch]) =>
          updateGameCommands({
            game: game as Game,
            batch: batch as GameCommandUpdate[],
          })
        );
      })
    )
  );

  updateGameCommands$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateGameCommands),
        // distinctUntilChanged<ReturnType<typeof updateGameCommands>>(isEqual),
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

  renameEnum$ = createEffect(() =>
    this._actions$.pipe(
      ofType(renameGameEnum),
      switchMap(({ game, oldEnumName, newEnumName }) =>
        this._extensions.getGameExtensions(game).pipe(
          // take(1),
          switchMap((extensions) => {
            const affectedCommands = flatMap(extensions, (extension) =>
              extension.commands
                .filter((c) =>
                  commandParams(c).some((p) => p.type === oldEnumName)
                )
                .map((c) => ({
                  extension: extension.name,
                  command: {
                    ...c,
                    input: replaceType(
                      c.input,
                      oldEnumName,
                      newEnumName || PrimitiveType.any
                    ),
                    output: replaceType(
                      c.output,
                      oldEnumName,
                      newEnumName || PrimitiveType.any
                    ),
                  },
                }))
            );
            return zip(
              ...affectedCommands.map(({ extension, command }) => {
                return this._game.getCommandSupportInfo(command, extension);
              })
            ).pipe(
              map((supportInfos) => {
                const otherGames = new Set<Game>();
                for (const info of supportInfos) {
                  const sameCommands = getSameCommands(info, game);
                  sameCommands.forEach((sameCommand) =>
                    otherGames.add(sameCommand.game)
                  );
                }
                otherGames.delete(game);
                return {
                  otherGames: [...otherGames],
                  affectedCommands,
                };
              })
            );
          }),
          switchMap(({ otherGames, affectedCommands }) => [
            updateGameCommands({
              game,
              batch: affectedCommands.map(({ extension, command }) => ({
                command,
                oldExtension: extension,
                newExtension: extension,
              })),
            }),
            ...otherGames.map((otherGame) =>
              renameGameEnum({
                game: otherGame,
                newEnumName,
                oldEnumName,
              })
            ),
          ])
        )
      )
    )
  );

  validateExtensions$ = createEffect(
    () =>
      this._actions$.pipe(
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

  cloneCommand$ = createEffect(() =>
    this._actions$.pipe(
      ofType(cloneCommand),
      tap(({ game, command, extension }) => {
        this._router.navigate(['/', game, extension, command.id]);
      }),
      map(({ game, command, extension }) =>
        updateGameCommands({
          game,
          batch: [
            { command, newExtension: extension, oldExtension: extension },
          ],
        })
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _extensions: ExtensionsFacade,
    private _changes: ChangesFacade,
    private _auth: AuthFacade,
    private _service: ExtensionsService,
    private _game: GameFacade,
    private _router: Router
  ) {}
}

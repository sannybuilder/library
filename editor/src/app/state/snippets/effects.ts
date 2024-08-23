import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  loadSnippets,
  loadSnippetsError,
  loadSnippetsSuccess,
  updateGameSnippet,
  updateSnippet,
} from './actions';
import { SnippetsService } from './service';
import { ChangesFacade } from '../changes/facade';
import { GameSnippets, GameSupportInfo } from '../../models';
import { getSameCommands, isOtherGame } from '../../utils';
import { GameFacade } from '../game/facade';
import { ExtensionsFacade } from '../extensions/facade';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnippetsEffects {
  loadSnippets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSnippets),
      distinctUntilChanged(
        (a, b) => GameSnippets[a.game] === GameSnippets[b.game]
      ),
      concatMap(({ game }) =>
        this.service.loadSnippets(game).pipe(
          map((extensionSnippets) =>
            loadSnippetsSuccess({ game, extensionSnippets })
          ),
          catchError(() => of(loadSnippetsError()))
        )
      )
    )
  );

  updateSnippet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSnippet),
      // distinctUntilChanged(isEqual),
      withLatestFrom(this._game.game$),
      switchMap(([{ content, extension, command, updateRelated }, game]) => {
        return this._extensions.getCommandSupportInfo(command, extension).pipe(
          take(1),
          switchMap((supportInfo?: GameSupportInfo[]) => {
            if (
              // Other games should not trigger cross game updates, nor should they be updated
              !isOtherGame(game) &&
              updateRelated
            ) {
              return getSameCommands(supportInfo, game)
                .filter((d) => !isOtherGame(d.game))
                .map((d) =>
                  updateGameSnippet({
                    game: d.game,
                    content,
                    extension,
                    id: command.id || command.name,
                  })
                );
            } else {
              return [
                updateGameSnippet({
                  game,
                  content,
                  extension,
                  id: command.id || command.name,
                }),
              ];
            }
          })
        );
      })
    )
  );

  updateGameSnippet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateGameSnippet),
        // distinctUntilChanged(isEqual),
        tap(({ game, content, extension, id }) => {
          const fileName = `${game}/snippets/${extension}/${id}.txt`;
          this._changes.registerTextFileChange(fileName, content);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: SnippetsService,
    private _changes: ChangesFacade,
    private _game: GameFacade,
    private _extensions: ExtensionsFacade
  ) {}
}

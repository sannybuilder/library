import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  concatMap,
  distinctUntilChanged,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { isEqual } from 'lodash';

import {
  loadSnippets,
  loadSnippetsSuccess,
  updateGameSnippet,
  updateSnippet,
} from './actions';
import { SnippetsService } from './service';
import { ChangesFacade } from '../changes/facade';
import { UiFacade } from '../ui/facade';
import { GameSupportInfo } from '../../models';
import { getSameCommands } from '../../utils';
import { GameFacade } from '../game/facade';

@Injectable({ providedIn: 'root' })
export class SnippetsEffects {
  loadSnippets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSnippets),
      concatMap(({ game }) =>
        this.service
          .loadSnippets(game)
          .pipe(
            map((extensionSnippets) =>
              loadSnippetsSuccess({ game, extensionSnippets })
            )
          )
      )
    )
  );

  updateSnippet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateSnippet),
      distinctUntilChanged(isEqual),
      withLatestFrom(this._game.game$),
      switchMap(([{ content, extension, command }, game]) => {
        return this._game.getCommandSupportInfo(command, extension).pipe(
          take(1),
          switchMap((supportInfo: GameSupportInfo[]) =>
            getSameCommands(supportInfo, game).map((d) =>
              updateGameSnippet({
                game: d.game,
                content,
                extension,
                opcode: command.id,
              })
            )
          )
        );
      })
    )
  );

  updateGameSnippet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateGameSnippet),
        distinctUntilChanged(isEqual),
        tap(({ game, content, extension, opcode }) => {
          const fileName = `${game}/snippets/${extension}/${opcode}.txt`;
          this._changes.registerSnippetChange(fileName, content);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: SnippetsService,
    private _changes: ChangesFacade,
    private _game: GameFacade
  ) {}
}

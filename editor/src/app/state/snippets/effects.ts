import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSnippets, loadSnippetsSuccess, updateSnippet } from './actions';
import { SnippetsService } from './service';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ChangesFacade } from '../changes/facade';
import { SnippetsFacade } from './facade';
import { UiFacade } from '../ui/facade';

@Injectable({ providedIn: 'root' })
export class SnippetsEffects {
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

  updateSnippet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateSnippet),
        withLatestFrom(this._ui.game$),
        tap(([{ content, extension, opcode }, game]) => {
          const fileName = [game, 'snippets', extension, `${opcode}.txt`].join(
            '/'
          );
          this._changes.registerSnippetChange(fileName, content);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: SnippetsService,
    private _snippets: SnippetsFacade,
    private _ui: UiFacade,
    private _changes: ChangesFacade
  ) {}
}

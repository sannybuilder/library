import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  distinctUntilChanged,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { isEqual } from 'lodash';

import { loadSnippets, loadSnippetsSuccess, updateSnippet } from './actions';
import { SnippetsService } from './service';
import { ChangesFacade } from '../changes/facade';
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
        distinctUntilChanged(isEqual),
        withLatestFrom(this._ui.game$),
        tap(([{ content, extension, opcode }, game]) => {
          const fileName = `${game}/snippets/${extension}/${opcode}.txt`;
          this._changes.registerSnippetChange(fileName, content);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: SnippetsService,
    private _ui: UiFacade,
    private _changes: ChangesFacade
  ) {}
}

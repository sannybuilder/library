import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSnippets, loadSnippetsSuccess } from './actions';
import { SnippetsService } from './service';
import { map, switchMap } from 'rxjs/operators';
import { ExtensionsFacade } from '../extensions/facade';

@Injectable()
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

  onGameChange$ = createEffect(() =>
    this._extensions.game$.pipe(map((game) => loadSnippets({ game })))
  );

  constructor(
    private actions$: Actions,
    private service: SnippetsService,
    private _extensions: ExtensionsFacade
  ) {}
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { loadArticle, loadArticleSuccess } from './actions';
import { GameFacade } from '../game/facade';
import { ArticlesService } from './service';

@Injectable({ providedIn: 'root' })
export class ArticlesEffects {
  loadArticle$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadArticle),
      withLatestFrom(this._game.game$),
      switchMap(([{ name }, game]) =>
        this._service
          .loadArticle(name, game)
          .pipe(map((content) => loadArticleSuccess({ content })))
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _game: GameFacade,
    private _service: ArticlesService
  ) {}
}

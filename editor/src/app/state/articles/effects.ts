import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import { loadArticle, loadArticleSuccess } from './actions';
import { GameFacade } from '../game/facade';
import { ArticlesService } from './service';
import { ChangesFacade } from '../changes/facade';
import { getBaseGame } from 'src/app/utils';

@Injectable({ providedIn: 'root' })
export class ArticlesEffects {
  loadArticle$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadArticle),
      withLatestFrom(this._game.game$),
      switchMap(([{ name }, game]) => {
        return this._changes.tree$.pipe(
          switchMap((tree) => {
            const baseGame = getBaseGame(game);
            const candidates = [
              `${game}/docs/${name}.md`,
              `${baseGame}/docs/${name}.md`,
              `shared/docs/${name}.md`,
            ];

            const source = tree.find((f) => candidates.includes(f));
            if (!source) {
              return [];
            }

            return this._service
              .loadArticle(name, game)
              .pipe(map((content) => loadArticleSuccess({ content, source })));
          })
        );
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _game: GameFacade,
    private _service: ArticlesService,
    private _changes: ChangesFacade
  ) {}
}

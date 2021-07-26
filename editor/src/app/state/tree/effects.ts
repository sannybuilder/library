import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ViewMode } from '../../models';
import { GameFacade } from '../game/facade';
import { displayDecisionTree } from '../ui/actions';
import { UiFacade } from '../ui/facade';
import { loadStatements, restart } from './actions';
import { TreeFacade } from './facade';

@Injectable({ providedIn: 'root' })
export class TreeEffects {
  reload$ = createEffect(() =>
    this._translate.onLangChange.pipe(
      withLatestFrom(this._ui.viewMode$, this._game.game$),
      filter(([_, viewMode]) => viewMode === ViewMode.ViewDecisionTree),
      switchMap(([_, __, game]) => [
        loadStatements({ game, lang: this._translate.currentLang }),
        restart(),
      ])
    )
  );

  load$ = createEffect(() =>
    this._actions.pipe(
      ofType(displayDecisionTree),
      withLatestFrom(this._game.game$),
      switchMap(([_, game]) => [
        loadStatements({ game, lang: this._translate.currentLang }),
        restart(),
      ])
    )
  );

  dictionary$ = createEffect(
    () =>
      this._facade.dictionary$.pipe(
        tap((tree) => {
          this._translate.setTranslation(
            this._translate.currentLang,
            { tree }, // todo: check if needed to clean previous tree object to avoid unnecessary keys
            true
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private _translate: TranslateService,
    private _facade: TreeFacade,
    private _game: GameFacade,
    private _ui: UiFacade,
    private _actions: Actions
  ) {}
}

import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { GameFacade } from '../game/facade';
import { preselectFiltersByGameName } from './actions';

@Injectable({ providedIn: 'root' })
export class VersionEffects {
  platformAndVersionFilters$ = createEffect(() =>
    this._game.gameName$.pipe(
      map((gameName) => preselectFiltersByGameName({ gameName }))
    )
  );

  constructor(private _game: GameFacade) {}
}

import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { GameFacade } from '../game/facade';
import { preselectFiltersByGame } from './actions';

@Injectable({ providedIn: 'root' })
export class VersionEffects {
  platformAndVersionFilters$ = createEffect(() =>
    this._game.game$.pipe(map((game) => preselectFiltersByGame({ game })))
  );

  constructor(private _game: GameFacade) {}
}

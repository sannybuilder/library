import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSupportInfoSuccess, onListEnter } from './actions';
import { distinctUntilKeyChanged, map, switchMap } from 'rxjs/operators';
import { GameService } from './service';

@Injectable({ providedIn: 'root' })
export class GameEffects {
  loadSupportInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(onListEnter),
      distinctUntilKeyChanged('game'),
      switchMap(({ game }) => this._service.loadSupportInfo(game)),
      map((supportInfo) => loadSupportInfoSuccess({ supportInfo }))
    )
  );

  constructor(private _actions$: Actions, private _service: GameService) {}
}

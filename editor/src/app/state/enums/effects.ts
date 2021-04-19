import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';

import { loadEnums, loadEnumsSuccess } from './actions';
import { EnumsService } from './service';

@Injectable({ providedIn: 'root' })
export class EnumsEffects {
  loadEnums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEnums),
      concatMap(({ game }) =>
        this.service
          .loadEnums(game)
          .pipe(map((enums) => loadEnumsSuccess({ game, enums })))
      )
    )
  );

  constructor(private actions$: Actions, private service: EnumsService) {}
}

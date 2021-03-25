import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ChangesFacade } from '../changes/facade';
import {
  enter,
  authorize,
  authorizeSuccess,
  authorizeFail,
  gotUser,
} from './actions';
import { AuthService } from './service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  authorize$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authorize),
        tap(() => {
          this.service.login(random(14));
        })
      ),
    { dispatch: false }
  );

  enter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(enter),
      map(({ accessToken: token }) => {
        const accessToken = token || this.service.getSession();
        if (accessToken) {
          return authorizeSuccess({ accessToken });
        }
        return authorizeFail();
      })
    );
  });

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorizeSuccess),
      switchMap(({ accessToken }) =>
        this.service.getUser(accessToken).pipe(
          map(({ login, avatar_url: avatarUrl }) =>
            gotUser({ login, avatarUrl })
          ),
          catchError(() => of(authorizeFail()))
        )
      )
    )
  );

  storeSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authorizeSuccess),
        tap(({ accessToken }) => {
          this.service.setSession(accessToken);
          this._changes.initializeGithub(accessToken);
        })
      ),
    { dispatch: false }
  );

  unauthorized$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authorizeFail),
        tap(() => {
          this.service.removeSession();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private _changes: ChangesFacade
  ) {}
}

const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
};

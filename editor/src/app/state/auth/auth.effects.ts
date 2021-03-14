import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  enter,
  authorize,
  authorizeSuccess,
  authorizeFail,
  gotUser,
} from './auth.actions';
import { AuthService } from './auth.service';

@Injectable()
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
      map(({ access_token: token }) => {
        const access_token = token || this.service.getSession();
        if (access_token) {
          return authorizeSuccess({ access_token });
        }
        return authorizeFail();
      })
    );
  });

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorizeSuccess),
      switchMap(({ access_token }) =>
        this.service.getUser(access_token).pipe(
          map(({ login, avatar_url }) => gotUser({ login, avatar_url })),
          catchError(() => of(authorizeFail()))
        )
      )
    )
  );

  storeSession$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authorizeSuccess),
        tap(({ access_token }) => {
          this.service.setSession(access_token);
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

  constructor(private actions$: Actions, private service: AuthService) {}
}

const random = (length = 8) => {
  return Math.random().toString(16).substr(2, length);
};

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  loadMainFile,
  loadScmFile,
  loadScmFileSuccess,
  loadScmMap,
  loadScmMapError,
  loadScmMapSuccess,
  loadScmOverlay,
  loadScmOverlaySuccess,
  updateScmRefs,
  updateScmVariables,
} from './actions';
import { ScmService } from './service';
import { GameFacade } from '../game/facade';
import { ScmFacade } from './facade';
import { ChangesFacade } from '../changes/facade';

@Injectable({ providedIn: 'root' })
export class ScmEffects {
  loadScmFile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadScmFile),
      withLatestFrom(this._game.game$),
      switchMap(([{ name }, game]) => {
        return this._facade.fileByName$(name).pipe(
          take(1),
          switchMap((cachedContent) => {
            if (cachedContent) {
              return [];
            }

            return this._service
              .loadFile(name, game)
              .pipe(map((content) => loadScmFileSuccess({ name, content })));
          }),
        );
      }),
    ),
  );

  loadMainFile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadMainFile),
      switchMap(() =>
        this._facade.map$.pipe(
          map((scmMap) => {
            const mainEntry = scmMap.files.find((f) => f.pid === 0);
            const mainFileName = mainEntry!.path.replace(/\.json$/, '');
            return loadScmFile({ name: mainFileName });
          }),
        ),
      ),
    ),
  );

  loadScmOverlay$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadScmOverlay),
      switchMap(({ game }) =>
        this._facade.overlayByGame$(game).pipe(
          take(1),
          switchMap((cachedOverlay) => {
            if (cachedOverlay !== undefined) {
              return [];
            }

            return this._service.loadOverlay(game).pipe(
              map(({ refs, variables }) =>
                loadScmOverlaySuccess({ game, refs, variables }),
              ),
              catchError(() =>
                of(loadScmOverlaySuccess({ game, refs: {}, variables: {} })),
              ),
            );
          }),
        ),
      ),
    ),
  );

  updateRefs$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateScmRefs),
        withLatestFrom(this._game.game$),
        tap(([{ refs }, game]) => {
          this._changes.registerTextFileChange(
            `${game}/scm/refs.json`,
            JSON.stringify(refs, null, 2),
          );
        }),
      ),
    { dispatch: false },
  );

  updateVariables$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateScmVariables),
        withLatestFrom(this._game.game$),
        tap(([{ variables }, game]) => {
          this._changes.registerTextFileChange(
            `${game}/scm/variables.json`,
            JSON.stringify(variables, null, 2),
          );
        }),
      ),
    { dispatch: false },
  );

  loadScmMap$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadScmMap),
      switchMap(({ game }) =>
        this._facade.mapByGame$(game).pipe(
          take(1),
          switchMap((cachedMap) => {
            if (cachedMap !== undefined) {
              return [];
            }

            return this._service.loadMap(game).pipe(
              map((mapData) => loadScmMapSuccess({ game, map: mapData })),
              catchError(() => of(loadScmMapError({ game }))),
            );
          }),
        ),
      ),
    ),
  );

  constructor(
    private _actions$: Actions,
    private _service: ScmService,
    private _game: GameFacade,
    private _facade: ScmFacade,
    private _changes: ChangesFacade,
  ) {}
}

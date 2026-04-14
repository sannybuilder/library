import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  take,
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
} from './actions';
import { ScmService } from './service';
import { GameFacade } from '../game/facade';
import { ScmFacade } from './facade';

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
              map((overlay) => loadScmOverlaySuccess({ game, overlay })),
              catchError(() =>
                of(loadScmOverlaySuccess({ game, overlay: {} })),
              ),
            );
          }),
        ),
      ),
    ),
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
  ) {}
}

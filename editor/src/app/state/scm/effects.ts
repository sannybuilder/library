import { inject, Injectable } from '@angular/core';
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
  loadCommentsOverlay,
  loadCommentsOverlayError,
  loadCommentsOverlaySuccess,
  loadMainFile,
  loadRefsOverlay,
  loadRefsOverlayError,
  loadRefsOverlaySuccess,
  loadScmFile,
  loadScmFileError,
  loadScmFileSuccess,
  loadScmMap,
  loadScmMapError,
  loadScmMapSuccess,
  loadVariableOverlay,
  loadVariableOverlayError,
  loadVariableOverlaySuccess,
  updateScmComments,
  updateScmRefs,
  updateScmVariables,
} from './actions';
import { ScmService } from './service';
import { GameFacade } from '../game/facade';
import { ScmFacade } from './facade';
import { ChangesFacade } from '../changes/facade';

@Injectable({ providedIn: 'root' })
export class ScmEffects {
  private _actions$ = inject(Actions);
  private _service = inject(ScmService);
  private _game = inject(GameFacade);
  private _facade = inject(ScmFacade);
  private _changes = inject(ChangesFacade);

  loadScmFile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadScmFile),
      switchMap(({ name }) =>
        this._game.game$.pipe(
          take(1),
          switchMap((game) =>
            this._facade.map$.pipe(
              take(1),
              switchMap((scmMap) =>
                this._facade.fileByName$(name).pipe(
                  take(1),
                  switchMap((cachedContent) => {
                    if (cachedContent) {
                      return [];
                    }

                    const base = scmMap?.base || `/assets/${game}/scm`;
                    return this._service.loadFile(name, base).pipe(
                      map((content) => loadScmFileSuccess({ name, content })),
                      catchError(() => of(loadScmFileError({ name }))),
                    );
                  }),
                ),
              ),
            ),
          ),
        ),
      ),
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

  loadVariableOverlay$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadVariableOverlay),
      switchMap(({ game }) =>
        this._facade.variablesByGame$(game).pipe(
          take(1),
          switchMap((cachedVariables) => {
            if (cachedVariables.length > 0) {
              return [];
            }

            return this._service.loadVariableOverlay(game).pipe(
              map((variables) => {
                const mapper = (obj: Record<string, string>) =>
                  Object.entries(obj).map(([key, value]) => ({ key, value }));
                const variablesArray = mapper(variables);
                return loadVariableOverlaySuccess({
                  game,
                  variables: variablesArray,
                });
              }),
              catchError(() => of(loadVariableOverlayError({ game }))),
            );
          }),
        ),
      ),
    ),
  );

  loadRefsOverlay$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadRefsOverlay),
      switchMap(({ game }) =>
        this._facade.refsByGame$(game).pipe(
          take(1),
          switchMap((cachedRefs) => {
            if (cachedRefs.length > 0) {
              return [];
            }
            return this._service.loadRefsOverlay(game).pipe(
              map((refs) => {
                const mapper = (obj: Record<string, string>) =>
                  Object.entries(obj).map(([key, value]) => ({ key, value }));
                const refsArray = mapper(refs);
                return loadRefsOverlaySuccess({ game, refs: refsArray });
              }),
              catchError(() => of(loadRefsOverlayError({ game }))),
            );
          }),
        ),
      ),
    ),
  );

  loadCommentsOverlay$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadCommentsOverlay),
      switchMap(({ game }) =>
        this._facade.commentsByGame$(game).pipe(
          take(1),
          switchMap((cachedComments) => {
            if (cachedComments.length > 0) {
              return [];
            }

            return this._service.loadCommentsOverlay(game).pipe(
              map((comments) => {
                const commentsArray = Object.entries(comments).map(
                  ([key, value]) => ({
                    key,
                    value: Array.isArray(value) ? value.join('\n') : value,
                  }),
                );

                return loadCommentsOverlaySuccess({
                  game,
                  comments: commentsArray,
                });
              }),
              catchError(() => of(loadCommentsOverlayError({ game }))),
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
            JSON.stringify(
              Object.fromEntries(refs.map(({ key, value }) => [key, value])),
              null,
              2,
            ),
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
            JSON.stringify(
              Object.fromEntries(
                variables.map(({ key, value }) => [key, value]),
              ),
              null,
              2,
            ),
          );
        }),
      ),
    { dispatch: false },
  );

  updateComments$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateScmComments),
        withLatestFrom(this._game.game$),
        tap(([{ comments }, game]) => {
          this._changes.registerTextFileChange(
            `${game}/scm/comments.json`,
            JSON.stringify(
              Object.fromEntries(
                comments.map(({ key, value }) => [key, value]),
              ),
              null,
              2,
            ),
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
}

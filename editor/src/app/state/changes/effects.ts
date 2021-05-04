import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of, zip } from 'rxjs';
import {
  distinctUntilChanged,
  switchMap,
  tap,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import * as diff from 'diff';

import {
  reloadPage,
  submitChanges,
  submitChangesFail,
  submitChangesSuccess,
  validateAndWriteFiles,
} from './actions';
import { ChangesFacade } from './facade';
import { Config, CONFIG } from '../../config';
import { toPairs } from 'lodash';
import { Game, GameLibrary, LoadExtensionsResponse } from '../../models';
import { AuthFacade } from '../auth/facade';
import { GitHubService } from '../github';

@Injectable({ providedIn: 'root' })
export class ChangesEffects {
  submitChanges$ = createEffect(() =>
    this._actions$.pipe(
      ofType(submitChanges),
      withLatestFrom(this._facade.changes$, this._facade.github$),
      distinctUntilChanged((a, b) => a[1] === b[1]),
      map(([_, changes, github]) => {
        if (!github) {
          if (!this._config.features.shouldBeAuthorizedToEdit) {
            console.log('Submit changes');
            console.table(toPairs(changes));
            return submitChangesSuccess();
          } else {
            console.error(
              'Must be logged into GitHub in order to submit changes!'
            );
            return submitChangesFail();
          }
        }

        const files = Object.entries(changes).map(([path, content]) => ({
          path,
          content,
        }));

        return validateAndWriteFiles({ files });
      })
    )
  );

  validateAndWriteFiles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(validateAndWriteFiles),
      withLatestFrom(this._auth.authToken$),
      switchMap(([{ files }, accessToken]) => {
        return zip(
          ...files.map((file) => {
            if (!isExtensionFile(file.path)) {
              return of(file);
            }
            const game = gameByExtensionFile(file.path);
            return this._gitHub
              .loadFileFromApi<LoadExtensionsResponse>(
                file.path,
                accessToken,
                game
              )
              .pipe(
                withLatestFrom(this._facade.snapshots$),
                map(([response, snapshots]) => {
                  const hasBeenChangedInRemote =
                    response.meta.last_update !==
                    snapshots[file.path].lastUpdate;

                  if (hasBeenChangedInRemote) {
                    const patch = diff.createPatch(
                      file.path,
                      snapshots[file.path].content,
                      file.content
                    );
                    const newContent = JSON.stringify(response, null, 2);
                    return {
                      path: file.path,
                      content:
                        diff.applyPatch(newContent, patch, {
                          fuzzFactor: 500,
                        }) || newContent, // do not submit changed files if patch failed
                    };
                  }
                  return file;
                })
              );
          })
        ).pipe(
          withLatestFrom(this._facade.github$),
          switchMap(([files, github]) => {
            return from(github!.writeFiles(files)).pipe(
              switchMap(() => [submitChangesSuccess(), reloadPage()])
            );
          })
        );
      })
    )
  );

  reloadPage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(reloadPage),
        tap(() => {
          // reloading page to ensure we pull the latest files
          window.location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _facade: ChangesFacade,
    private _auth: AuthFacade,
    private _gitHub: GitHubService,
    @Inject(CONFIG) private _config: Config
  ) {}
}

function isExtensionFile(fileName: string) {
  return Object.entries(GameLibrary).some(([, f]) => f === fileName);
}

function gameByExtensionFile(fileName: string): Game {
  return Object.entries(GameLibrary).find(
    ([, f]) => f === fileName
  )?.[0] as Game;
}

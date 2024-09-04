import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, switchMap, timeout } from 'rxjs/operators';
import type { components } from '@octokit/openapi-types';
import { Observable } from 'rxjs';

import { CONFIG, Config } from '../../config';
import { Game } from '../../models';

export type GetRepoContentResponseDataBlob = components['schemas']['blob'];
export type GetRepoContentResponseDataDirectory =
  components['schemas']['content-directory'];
export type GetRepoCommit = components['schemas']['commit'];
export type GetRepoTree = components['schemas']['git-tree'];

@Injectable({ providedIn: 'root' })
export class GitHubService {
  constructor(
    @Inject(CONFIG) private _config: Config,
    private _http: HttpClient
  ) {}

  loadFileGracefully<T extends object>(
    fileName: string,
    accessToken: string | undefined,
    game: Game
  ): Observable<T> {
    return this._http
      .get<T>(Location.joinWithSlash(this._config.endpoints.base, fileName))
      .pipe(
        timeout(3000),
        catchError(() => this.loadFileFromApi<T>(fileName, accessToken, game))
      );
  }

  loadFileFromApi<T extends object>(
    fileName: string,
    accessToken: string | undefined,
    game: Game
  ): Observable<T> {
    const headers = accessToken
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        })
      : undefined;
    return this._http
      .get<GetRepoContentResponseDataDirectory>(
        Location.joinWithSlash(this._config.endpoints.contents, game),
        { headers }
      )
      .pipe(
        timeout(3000),
        switchMap((dir) => {
          const { git_url } = dir.find((file) => file.path === fileName) ?? {};
          if (!git_url) {
            throw new Error(`File ${fileName} not found in the repo`);
          }
          return this._http
            .get<GetRepoContentResponseDataBlob>(git_url, { headers })
            .pipe(map((blob) => JSON.parse(atob(blob.content)) as T));
        }),
        catchError(() => this.loadFileFromAssets<T>(fileName))
      );
  }

  loadFileFromAssets<T extends object>(fileName: string) {
    const ts = Date.now().toString();
    return this._http
      .get<T>(Location.joinWithSlash('/assets', fileName), {
        params: { ts },
      })
      .pipe(timeout(3000));
  }

  loadMarkdown(fileName: string) {
    return this._http.get(Location.joinWithSlash('/assets', fileName), {
      responseType: 'text',
    });
  }

  getRevision(accessToken: string | undefined) {
    const ts = Date.now().toString();
    const headers = accessToken
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        })
      : undefined;
    return this._http
      .get<GetRepoCommit>(this._config.endpoints.revision, {
        headers,
        params: { ts },
      })
      .pipe(
        timeout(3000),
        map(({ sha }) => sha)
      );
  }

  getTree(accessToken: string | undefined) {
    const headers = accessToken
      ? new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        })
      : undefined;
    return this._http
      .get<GetRepoTree>(this._config.endpoints.tree, {
        headers,
      })
      .pipe(
        timeout(3000),
        map(({ tree }) => tree)
      );
  }
}

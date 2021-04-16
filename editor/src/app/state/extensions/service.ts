import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import type { components } from '@octokit/openapi-types';

type GetRepoContentResponseDataBlob = components['schemas']['blob'];
type GetRepoContentResponseDataDirectory = components['schemas']['content-directory'];

import { CONFIG, Config } from '../../config';
import { Extension, Game, GameLibrary } from '../../models';

interface LoadExtensionsResponse {
  meta: {
    last_update: number;
  };
  extensions: Extension[];
}

@Injectable({ providedIn: 'root' })
export class ExtensionsService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) public config: Config
  ) {}

  /**
   * trying the following in order of availability
   * 1. getting JSON file from raw.githubusercontent.com
   * 2. trying github API as an authorized user (5000 requests per hour)
   * 3. trying github API as an anonymous user (60 requests per hour)
   * 4. trying a local version from /assets
   */
  loadExtensions(
    game: Game,
    accessToken?: string
  ): Observable<{
    extensions: Extension[];
    lastUpdate: number;
  }> {
    return this.http
      .get(
        Location.joinWithSlash(this.config.endpoints.base, GameLibrary[game])
      )
      .pipe(
        catchError(() => {
          const headers = accessToken
            ? new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              })
            : undefined;
          return this.http
            .get<GetRepoContentResponseDataDirectory>(
              Location.joinWithSlash(this.config.endpoints.contents, game),
              {
                headers,
              }
            )
            .pipe(
              switchMap((dir) => {
                const { git_url } =
                  dir.find((file) => file.path === GameLibrary[game]) ?? {};
                if (!git_url) {
                  throw new Error(
                    `File ${GameLibrary[game]} not found in the repo`
                  );
                }
                return this.http
                  .get<GetRepoContentResponseDataBlob>(git_url, {
                    headers,
                  })
                  .pipe(map((blob) => JSON.parse(atob(blob.content))));
              }),
              catchError(() =>
                this.http.get(
                  Location.joinWithSlash('/assets', GameLibrary[game])
                )
              )
            );
        }),
        map((data: LoadExtensionsResponse) => ({
          extensions: data.extensions,
          lastUpdate: data.meta.last_update,
        }))
      );
  }
}

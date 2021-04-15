import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  loadExtensions(
    game: Game
  ): Observable<{
    extensions: Extension[];
    lastUpdate: number;
  }> {
    return this.http
      .get<GetRepoContentResponseDataDirectory>(
        'https://api.github.com/repos/sannybuilder/library/contents/' + game
      )
      .pipe(
        switchMap((dir) => {
          const { git_url } =
            dir.find((file) => file.path === GameLibrary[game]) ?? {};
          if (!git_url) {
            throw new Error(`File ${GameLibrary[game]} not found in the repo`);
          }
          return this.http
            .get<GetRepoContentResponseDataBlob>(git_url)
            .pipe(map((blob) => JSON.parse(atob(blob.content))));
        }),
        map((data: LoadExtensionsResponse) => ({
          extensions: data.extensions,
          lastUpdate: data.meta.last_update,
        }))
      );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Extension, Game, GameLibrary } from '../../models';
import { GitHubService } from '../github/service';

interface LoadExtensionsResponse {
  meta: {
    last_update: number;
  };
  extensions: Extension[];
}

@Injectable({ providedIn: 'root' })
export class ExtensionsService {
  constructor(private _github: GitHubService) {}

  loadExtensions(
    game: Game,
    accessToken?: string
  ): Observable<{
    extensions: Extension[];
    lastUpdate: number;
  }> {
    return this._github
      .loadFileGracefully(GameLibrary[game], accessToken, game)
      .pipe(
        map((data: LoadExtensionsResponse) => ({
          extensions: data.extensions,
          lastUpdate: data.meta.last_update,
        }))
      );
  }
}

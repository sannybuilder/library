import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    const ts = Date.now().toString();
    return this.http
      .get<LoadExtensionsResponse>(
        Location.joinWithSlash(this.config.endpoints.base, GameLibrary[game]),
        { params: { ts } }
      )
      .pipe(
        map((data) => ({
          extensions: data.extensions,
          lastUpdate: data.meta.last_update,
        }))
      );
  }
}

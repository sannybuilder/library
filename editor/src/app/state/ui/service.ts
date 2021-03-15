import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CONFIG, Config } from '../../config';
import { Extension, Game } from '../../models';

interface LoadCommandsResponse {
  meta: {
    last_update: number;
  };
  extensions: Extension[];
}

@Injectable({ providedIn: 'root' })
export class UiService {
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
      .get<LoadCommandsResponse>(this.config.endpoints.extensions[game])
      .pipe(
        map((data) => ({
          extensions: data.extensions,
          lastUpdate: data.meta.last_update,
        }))
      );
  }
}

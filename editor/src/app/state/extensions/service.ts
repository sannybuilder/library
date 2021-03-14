import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pickBy } from 'lodash';

import { AuthService } from '../auth/auth.service';
import { CONFIG, Config } from '../../config';
import { Extension, Game, GameLibrary } from '../../models';

interface LoadCommandsResponse {
  meta: {
    last_update: number;
  };
  extensions: Extension[];
}

@Injectable()
export class ExtensionsService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) public config: Config,
    private _authService: AuthService
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

  saveChanges(
    game: Game,
    data: Extension[]
  ): Observable<{ lastUpdate: number }> {
    const lastUpdate = Date.now();
    const newContent = {
      meta: {
        last_update: lastUpdate,
      },
      extensions: this.stripBody(data),
    };
    return from(
      this._authService.saveFile(
        GameLibrary[game],
        JSON.stringify(newContent, null, 2)
      )
    ).pipe(map(() => ({ lastUpdate })));
  }

  private stripBody(data: Extension[]) {
    return data.map((e) => ({
      ...e,
      commands: e.commands.map((c) =>
        pickBy(
          {
            ...c,
            id: c.id,
            attrs: pickBy(c.attrs, (x) => x),
            class: c.attrs.is_unsupported ? null : c.class,
            member: c.attrs.is_unsupported ? null : c.member,
            short_desc: c.attrs.is_unsupported ? null : c.short_desc,
          },
          (x) => x !== null && (!Array.isArray(x) || x.length > 0)
        )
      ),
    }));
  }
}

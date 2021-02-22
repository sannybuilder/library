import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONFIG, Config } from '../config';
import { Extension, Game } from '../models';

interface LoadCommandsResponse {
  meta: {
    last_update: number;
  };
  extensions: Extension[];
}

interface UpdateCommandsResponse {
  result: 'OK';
  last_update: number;
}

@Injectable({ providedIn: 'root' })
export class CommandsService {
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
    return this.http.get<LoadCommandsResponse>(this.getEndpoint(game)).pipe(
      map((data) => ({
        extensions: data.extensions,
        lastUpdate: data.meta.last_update,
      }))
    );
  }

  updateExtensions(
    game: Game,
    data: Extension[]
  ): Observable<{ lastUpdate: number }> {
    return this.http
      .post<UpdateCommandsResponse>(this.getEndpoint(game), data)
      .pipe(map(({ last_update: lastUpdate }) => ({ lastUpdate })));
  }

  private getEndpoint(game: Game) {
    switch (game) {
      case Game.GTA3:
        return this.config.endpoints.commands.gta3;
      case Game.VC:
        return this.config.endpoints.commands.vc;
    }
    throw new Error(`unknown game: ${game}`);
  }
}

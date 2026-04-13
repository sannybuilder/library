import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScmMap, ScriptFile } from '../../components/scm/model';
import { Game } from '../../models';
import { combineLatest, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScmService {
  constructor(private _http: HttpClient) {}

  loadFile(name: string, game: Game) {
    return this._http.get<ScriptFile>(`/assets/${game}/scm/${name}.json`, {
      params: { ts: Date.now().toString() },
    });
  }

  loadOverlay(game: Game) {
    let refs = this._http.get<Record<string, string>>(
      `/assets/${game}/scm/refs.json`,
      {
        params: { ts: Date.now().toString() },
      },
    );
    let variables = this._http.get<Record<string, string>>(
      `/assets/${game}/scm/variables.json`,
      {
        params: { ts: Date.now().toString() },
      },
    );
    return combineLatest([refs, variables]).pipe(
      map(([base, user]) => ({ ...base, ...user })),
    );
  }

  loadMap(game: Game) {
    return this._http.get<ScmMap>(`/assets/${game}/scm/map.json`, {
      params: { ts: Date.now().toString() },
    });
  }
}

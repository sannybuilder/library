import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ScmMap, ScriptFile } from '../../components/scm/model';
import { Game } from '../../models';

@Injectable({ providedIn: 'root' })
export class ScmService {
  constructor(private _http: HttpClient) {}

  loadFile(name: string, base: string) {
    return this._http.get<ScriptFile>(`${base}/${name}.json`, {
      params: { ts: Date.now().toString() },
    });
  }

  loadVariableOverlay(game: Game) {
    return this._http.get<Record<string, string>>(
      `/assets/${game}/scm/variables.json`,
      {
        params: { ts: Date.now().toString() },
      },
    );
  }

  loadRefsOverlay(game: Game) {
    return this._http.get<Record<string, string>>(
      `/assets/${game}/scm/refs.json`,
      {
        params: { ts: Date.now().toString() },
      },
    );
  }

  loadMap(game: Game) {
    return this._http.get<ScmMap>(`/assets/${game}/scm/map.json`, {
      params: { ts: Date.now().toString() },
    });
  }
}

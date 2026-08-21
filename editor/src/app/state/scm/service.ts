import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ScmMap, ScriptFile } from '../../components/scm/model';
import { CONFIG } from '../../config';
import { Game } from '../../models';
import { getScmAssetBase, getScmBase } from '../../utils';

@Injectable({ providedIn: 'root' })
export class ScmService {
  private _http = inject(HttpClient);
  private _config = inject(CONFIG);

  // Base URL shared by map.json, the overlays and every script file for a version.
  scmBase(game: Game, version?: string): string {
    if (!version) {
      return getScmAssetBase(game);
    }
    return getScmBase(this._config.scmBase, game, version);
  }

  loadFile(name: string, base: string) {
    return this._http.get<ScriptFile>(`${base}/${name}.json`, {
      params: { ts: Date.now().toString() },
    });
  }

  loadVariableOverlay(game: Game, version?: string) {
    return this._http.get<Record<string, string>>(
      `${getScmAssetBase(game, version)}/variables.json`,
      {
        params: { ts: Date.now().toString() },
      },
    );
  }

  loadRefsOverlay(game: Game, version?: string) {
    return this._http.get<Record<string, string>>(
      `${getScmAssetBase(game, version)}/refs.json`,
      {
        params: { ts: Date.now().toString() },
      },
    );
  }

  loadCommentsOverlay(game: Game, version?: string) {
    return this._http.get<Record<string, string | string[]>>(
      `${getScmAssetBase(game, version)}/comments.json`,
      {
        params: { ts: Date.now().toString() },
      },
    );
  }

  loadMap(game: Game, version?: string) {
    return this._http.get<ScmMap>(`${this.scmBase(game, version)}/map.json`, {
      params: { ts: Date.now().toString() },
    });
  }
}

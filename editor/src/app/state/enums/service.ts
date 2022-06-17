import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Game, GameEnums, Enums } from '../../models';
import { GitHubService } from '../github/service';

@Injectable({ providedIn: 'root' })
export class EnumsService {
  constructor(private _github: GitHubService) {}

  loadEnums(game: Game, accessToken?: string): Observable<Enums> {
    return this._github.loadFileGracefully(GameEnums[game], accessToken, game);
  }

  loadEnumsInfo() {
    return this._github.loadFileFromAssets<Record<Game, string[]>>(
      'enums-info.json'
    );
  }
}

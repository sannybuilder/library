import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Game, GameStructs, Structs } from '../../models';
import { GitHubService } from '../github/service';


@Injectable({ providedIn: 'root' })
export class StructsService {
  constructor(private _github: GitHubService) {}

  loadStructs(game: Game, accessToken?: string): Observable<Structs> {
    return this._github.loadFileGracefully(GameStructs[game], accessToken, game);
  }
}

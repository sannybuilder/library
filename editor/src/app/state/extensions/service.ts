import { Injectable } from '@angular/core';

import { Game, GameLibrary, LoadExtensionsResponse } from '../../models';
import { GitHubService } from '../github/service';

@Injectable({ providedIn: 'root' })
export class ExtensionsService {
  constructor(private _github: GitHubService) {}

  loadExtensions(game: Game, accessToken?: string) {
    return this._github.loadFileGracefully<LoadExtensionsResponse>(
      GameLibrary[game],
      accessToken,
      game
    );
  }
}

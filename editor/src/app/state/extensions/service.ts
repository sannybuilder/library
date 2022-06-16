import { Injectable } from '@angular/core';

import {
  Game,
  GameLibrary,
  LoadExtensionsResponse,
  PackedSupportInfo,
} from '../../models';
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

  loadSupportInfo() {
    return this._github.loadFileFromAssets<
      Record<Game, Record<string, Record<string, PackedSupportInfo[]>>>
    >('support-info.json');
  }
}

import { Injectable } from '@angular/core';

import {
  ViewContext,
  Game,
  GameNativeLibrary,
  GameLibrary,
  LoadExtensionsResponse,
  PackedSupportInfo,
} from '../../models';
import { GitHubService } from '../github/service';

@Injectable({ providedIn: 'root' })
export class ExtensionsService {
  constructor(private _github: GitHubService) {}

  loadExtensions(
    game: Game,
    viewContext: ViewContext,
    accessToken?: string
  ) {
    return this._github.loadFileGracefully<LoadExtensionsResponse>(
      viewContext === ViewContext.Script
        ? GameLibrary[game]
        : GameNativeLibrary[game],
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

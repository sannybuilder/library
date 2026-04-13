import { Injectable } from '@angular/core';

import {
  ViewContext,
  Game,
  GameNativeLibrary,
  GameLibrary,
  LoadExtensionsResponse,
  PackedSupportInfo,
} from '../../models';
import { isCodeViewContext } from '../../utils';
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
      isCodeViewContext(viewContext) ? GameNativeLibrary[game] : GameLibrary[game],
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

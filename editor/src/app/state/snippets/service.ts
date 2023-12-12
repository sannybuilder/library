import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtensionSnippets, Game, GameSnippets } from '../../models';
import { GitHubService } from '../github';

@Injectable({ providedIn: 'root' })
export class SnippetsService {
  constructor(private _github: GitHubService) {}

  loadSnippets(
    game: Game
  ): Observable<ExtensionSnippets> {
    return this._github.loadFileFromAssets(GameSnippets[game]);
  }
}

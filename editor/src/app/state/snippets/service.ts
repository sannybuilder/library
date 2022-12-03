import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtensionSnippets, GameSnippets } from '../../models';
import { GameEditions } from '../../utils';
import { GitHubService } from '../github';

@Injectable({ providedIn: 'root' })
export class SnippetsService {
  constructor(private _github: GitHubService) {}

  loadSnippets(
    game: keyof typeof GameEditions
  ): Observable<ExtensionSnippets> {
    return this._github.loadFileFromAssets(GameSnippets[game]);
  }
}

import { Injectable } from '@angular/core';
import { Game } from '../../models';
import { GitHubService } from '../github/service';

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  constructor(private _github: GitHubService) {}

  loadArticle(name: string, game: Game) {
    return this._github.loadMarkdown(`${game}/docs/${name}.md`);
  }
}

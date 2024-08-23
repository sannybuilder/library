import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Command, Game } from '../../models';
import { loadSnippets, updateSnippet } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class SnippetsFacade {
  constructor(private store$: Store) {}

  getSnippet(extension: string, id: string) {
    return this.store$.select(selector.snippets, {
      extension,
      id,
    });
  }

  updateSnippet({
    extension,
    command,
    content,
    updateRelated,
  }: {
    extension: string;
    command: Command;
    content: string;
    updateRelated: boolean;
  }) {
    return this.store$.dispatch(updateSnippet({ extension, command, content, updateRelated }));
  }

  loadSnippets(game: Game) {
    return this.store$.dispatch(loadSnippets({ game }));
  }
}

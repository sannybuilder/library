import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameEditions } from '../../utils';
import { Command } from '../../models';
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
  }: {
    extension: string;
    command: Command;
    content: string;
  }) {
    return this.store$.dispatch(updateSnippet({ extension, command, content }));
  }

  loadSnippets(game: keyof typeof GameEditions) {
    return this.store$.dispatch(loadSnippets({ game }));
  }
}
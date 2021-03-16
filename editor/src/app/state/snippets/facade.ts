import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateSnippet } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class SnippetsFacade {
  constructor(private store$: Store) {}

  getSnippet(extension: string, opcode: string) {
    return this.store$.select(selector.snippets, {
      extension,
      opcode,
    });
  }

  updateSnippet({
    extension,
    opcode,
    content,
  }: {
    extension: string;
    opcode: string;
    content: string;
  }) {
    return this.store$.dispatch(updateSnippet({ extension, opcode, content }));
  }
}

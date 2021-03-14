import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as selector from './selectors';

@Injectable()
export class SnippetsFacade {
  getSnippet(extension: string, opcode: string) {
    return this.store$.select(selector.snippets, {
      extension,
      opcode,
    });
  }

  constructor(private store$: Store) {}
}

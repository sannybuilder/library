import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadArticle } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  currentArticle$ = this.store$.select(selector.currentArticle);
  constructor(private store$: Store) {}

  loadArticle(name: string) {
    return this.store$.dispatch(loadArticle({ name }));
  }
}

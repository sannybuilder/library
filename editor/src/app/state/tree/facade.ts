import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { back, next, restart } from './actions';
import { TreeNode } from '../../models/tree';
import { currentLine, currentNode, dictionary, nextNodes } from './selector';

@Injectable({ providedIn: 'root' })
export class TreeFacade {
  nextNodes$ = this._store$.select(nextNodes);
  currentNode$ = this._store$.select(currentNode);
  currentLine$ = this._store$.select(currentLine);
  dictionary$ = this._store$.select(dictionary);

  constructor(private _store$: Store) {}

  next(node: TreeNode, lineChunk: string) {
    this._store$.dispatch(next({ node, lineChunk }));
  }

  back() {
    this._store$.dispatch(back());
  }

  restart() {
    this._store$.dispatch(restart());
  }
}

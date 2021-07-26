import { createAction, props } from '@ngrx/store';
import { Game } from '../../models';
import { TreeNode } from '../../models/tree';

export const next = createAction(
  '[tree] next node',
  props<{ node: TreeNode; lineChunk: string }>()
);

export const back = createAction('[tree] go back to previous choice');

export const restart = createAction('[tree] restart');

export const loadStatements = createAction(
  '[tree] load statements',
  props<{ game: Game; lang: string }>()
);

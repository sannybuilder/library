import { createAction, props } from '@ngrx/store';
import { Command, ExtensionSnippets, Game } from '../../models';

export const loadSnippets = createAction(
  '[snippets] load',
  props<{ game: Game }>()
);

export const loadSnippetsSuccess = createAction(
  '[snippets] load success',
  props<{ game: Game; extensionSnippets: ExtensionSnippets }>()
);

export const updateSnippet = createAction(
  '[snippets] update',
  props<{ extension: string; command: Command; content: string }>()
);

export const updateGameSnippet = createAction(
  '[snippets] update for the given game',
  props<{ game: Game; extension: string; opcode: string; content: string }>()
);

import { createAction, props } from '@ngrx/store';
import { Command, ExtensionSnippets, Game } from '../../models';

export const loadSnippets = createAction(
  'load snippets',
  props<{ game: Game }>()
);

export const loadSnippetsSuccess = createAction(
  'load snippets success',
  props<{ game: Game; extensionSnippets: ExtensionSnippets }>()
);

export const updateSnippet = createAction(
  'update snippets',
  props<{ extension: string; command: Command; content: string }>()
);

export const updateGameSnippet = createAction(
  'update game snippets',
  props<{ game: Game; extension: string; opcode: string; content: string }>()
);

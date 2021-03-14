import { createAction, props } from '@ngrx/store';
import { ExtensionSnippets, Game } from '../../models';

export const loadSnippets = createAction(
  'load snippets',
  props<{ game: Game }>()
);

export const loadSnippetsSuccess = createAction(
  'load snippets success',
  props<{ extensionSnippets: ExtensionSnippets }>()
);

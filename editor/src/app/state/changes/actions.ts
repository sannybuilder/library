import { createAction, props } from '@ngrx/store';
import { Extension, Game } from '../../models';

export const registerExtensionsChange = createAction(
  'register extensions change',
  props<{ extensions: Extension[]; game: Game }>()
);

export const registerSnippetChange = createAction(
  'register snippet change',
  props<{ extension: string; content: string }>()
);

export const clearChanges = createAction('clear changes');

export const submitChanges = createAction('submit changes');

export const submitChangesSuccess = createAction(
  'submit changes success',
  props<{ lastUpdate: number }>()
);

export const initializeGithub = createAction(
  'initialize github',
  props<{ accessToken: string }>()
);

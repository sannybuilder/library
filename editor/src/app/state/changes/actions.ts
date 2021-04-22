import { createAction, props } from '@ngrx/store';
import { Enums, Extension } from '../../models';

export const registerExtensionsChange = createAction(
  'register extensions change',
  props<{ fileName: string; content: Extension[] }>()
);

export const registerSnippetChange = createAction(
  'register snippet change',
  props<{ fileName: string; content: string }>()
);

export const registerEnumChange = createAction(
  'register enum change',
  props<{ fileName: string; content: Enums }>()
);

export const clearChanges = createAction('clear changes');

export const submitChanges = createAction('submit changes');

export const submitChangesSuccess = createAction('submit changes success');

export const initializeGithub = createAction(
  'initialize github',
  props<{ accessToken: string }>()
);

export const reloadPage = createAction('reload page');

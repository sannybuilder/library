import { createAction, props } from '@ngrx/store';
import { Enums, Extension } from '../../models';

export const registerExtensionsChange = createAction(
  '[changes] register extensions',
  props<{ fileName: string; content: Extension[] }>()
);

export const registerSnippetChange = createAction(
  '[changes] register snippet',
  props<{ fileName: string; content: string }>()
);

export const registerEnumChange = createAction(
  '[changes] register enum',
  props<{ fileName: string; content: Enums }>()
);

export const clearChanges = createAction('[changes] clear');

export const submitChanges = createAction('[changes] submit');

export const submitChangesSuccess = createAction('[changes] submit success');

export const submitChangesFail = createAction('[changes] submit fail');

export const initializeGithub = createAction(
  '[changes] initialize github',
  props<{ accessToken?: string }>()
);

export const reloadPage = createAction('[changes] reload page');

export const registerFileContent = createAction(
  '[changes] register file content',
  props<{ fileName: string; lastUpdate: number; content: string }>()
);

export const validateAndWriteFiles = createAction(
  '[changes] validate and write files',
  props<{ files: Array<{ path: string; content: string }> }>()
);

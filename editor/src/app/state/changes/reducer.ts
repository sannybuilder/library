import { createReducer, on } from '@ngrx/store';
import { pickBy } from 'lodash';

import {
  createGitHubAdaptor,
  createKoreFile,
  KoreFile,
} from '../../state/github';
import { Extension } from '../../models';
import { stripSourceAny, smash } from '../../utils';
import {
  clearChanges,
  initializeGithub,
  registerFileContent,
  registerEnumChange,
  registerExtensionsChange,
  registerSnippetChange,
  submitChanges,
  submitChangesFail,
  submitChangesSuccess,
} from './actions';

type FileName = string;
export interface ChangesState {
  changes: Record<FileName, string>;
  snapshots: Record<FileName, { lastUpdate: number; content: string }>;
  github?: KoreFile;
  lastUpdate?: number;
  isUpdating: boolean;
  hasChanges: boolean;
}

export const initialState: ChangesState = {
  changes: {},
  snapshots: {},
  isUpdating: false,
  hasChanges: false,
};

export const changesReducer = createReducer(
  initialState,
  on(registerExtensionsChange, (state, { fileName, version, url, content }) => {
    const newContent = JSON.stringify(
      {
        meta: {
          last_update: Date.now(),
          version,
          url,
        },
        extensions: stripBody(content),
      },
      null,
      2
    );

    return {
      ...state,
      hasChanges: true,
      changes: {
        ...state.changes,
        [fileName]: newContent,
      },
    };
  }),
  on(registerSnippetChange, (state, { fileName, content }) => {
    return {
      ...state,
      hasChanges: true,
      changes: { ...state.changes, [fileName]: content },
    };
  }),
  on(registerEnumChange, (state, { fileName, content }) => {
    return {
      ...state,
      hasChanges: true,
      changes: {
        ...state.changes,
        [fileName]: JSON.stringify(content, null, 2),
      },
    };
  }),
  on(submitChanges, (state) => ({ ...state, isUpdating: true })),
  on(submitChangesSuccess, () => ({
    ...initialState,
  })),
  on(submitChangesFail, (state) => ({
    ...state,
    changes: { ...state.changes }, // allow retry
    isUpdating: false,
  })),
  on(clearChanges, () => ({
    ...initialState,
  })),
  on(initializeGithub, (state, { accessToken }) => ({
    ...state,
    github: accessToken
      ? createKoreFile({
          adaptor: createGitHubAdaptor({
            owner: 'sannybuilder',
            repo: 'library',
            ref: 'heads/master',
            token: accessToken,
          }),
        })
      : undefined,
  })),
  on(registerFileContent, (state, { fileName, content, lastUpdate }) => {
    return {
      ...state,
      snapshots: { ...state.snapshots, [fileName]: { lastUpdate, content } },
    };
  })
);

function stripBody(extensions: Extension[]) {
  return extensions.map((e) => ({
    ...e,
    commands: e.commands.map((c) =>
      pickBy(
        {
          ...c,
          id: c.id,
          attrs: c.attrs ? smash(c.attrs) : c.attrs,
          class: c.attrs?.is_unsupported ? null : c.class,
          member: c.attrs?.is_unsupported ? null : c.member,
          short_desc: c.attrs?.is_unsupported ? null : c.short_desc,
          input: c.input?.map(stripSourceAny),
          output: c.output?.map(stripSourceAny),
        },
        (x) => x !== null && (!Array.isArray(x) || x.length > 0)
      )
    ),
  }));
}

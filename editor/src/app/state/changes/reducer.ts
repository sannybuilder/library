import { createReducer, on } from '@ngrx/store';

import {
  createGitHubAdaptor,
  createKoreFile,
  KoreFile,
} from '../../state/github';
import { normalize } from '../../utils';
import {
  clearChanges,
  initializeGithub,
  registerFileContent,
  registerEnumChange,
  registerExtensionsChange,
  registerTextFileChange,
  submitChanges,
  submitChangesFail,
  submitChangesSuccess,
  loadLastRevisionSuccess,
} from './actions';

type FileName = string;
export interface ChangesState {
  changes: Record<FileName, string>;
  snapshots: Record<FileName, { lastUpdate: number; content: string }>;
  github?: KoreFile;
  lastUpdate?: number;
  isUpdating: boolean;
  hasChanges: boolean;
  lastRevision?: string;
}

export const initialState: ChangesState = {
  changes: {},
  snapshots: {},
  isUpdating: false,
  hasChanges: false,
};

export const changesReducer = createReducer(
  initialState,
  on(
    registerExtensionsChange,
    (state, { fileName, version, url, content, classesMeta, game }) => {
      const newContent = JSON.stringify(
        {
          meta: {
            last_update: Date.now(),
            version,
            url,
          },
          extensions: normalize(content, game),
          classes: classesMeta,
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
    }
  ),
  on(registerTextFileChange, (state, { fileName, content }) => {
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
  }),
  on(loadLastRevisionSuccess, (state, { revision }) => ({
    ...state,
    lastRevision: revision,
  }))
);

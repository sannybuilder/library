import { createReducer, on } from '@ngrx/store';
import { pickBy, sortBy } from 'lodash';

import {
  createGitHubAdaptor,
  createKoreFile,
  KoreFile,
} from '../../state/github';
import { Extension, Game, GamePlatforms, GameVersions } from '../../models';
import { stripSourceAny, smash } from '../../utils';
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
  })
);

function normalize(extensions: Extension[], game: Game) {
  return extensions
    .map((e) => ({
      ...e,
      commands: sortBy(
        e.commands.map((c) => {
          const isUnsupported = !!c.attrs?.is_unsupported;
          return pickBy(
            {
              ...c,
              id: c.id || null,
              attrs: c.attrs ? smash(c.attrs) : c.attrs,
              class: isUnsupported ? null : c.class,
              member: isUnsupported ? null : c.member,
              short_desc: isUnsupported ? null : c.short_desc,
              input: isUnsupported ? null : c.input?.map(stripSourceAny),
              output: isUnsupported ? null : c.output?.map(stripSourceAny),
              num_params: isUnsupported ? 0 : c.num_params,
              versions: isVersioned(game) ? c.versions : [],
              platforms: isPlatformed(game) ? c.platforms : [],
            },
            (x) => x != null && (!Array.isArray(x) || x.length > 0)
          );
        }, 'id')
      ),
    }))
    .filter((e) => e.commands.length > 0);
}

function isVersioned(game: Game): boolean {
  return GameVersions[game].length > 1;
}

function isPlatformed(game: Game): boolean {
  return GamePlatforms[game].length > 1;
}

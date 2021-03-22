import { Action, createReducer, on } from '@ngrx/store';
import { pickBy } from 'lodash';

import { createGitHubAdaptor, createKoreFile, KoreFile } from '../../korefile';
import { Extension } from '../../models';
import { stripSourceAny, smash } from '../../utils';
import {
  clearChanges,
  initializeGithub,
  registerExtensionsChange,
  registerSnippetChange,
  submitChanges,
  submitChangesSuccess,
} from './actions';

export interface ChangesState {
  changes: Map<string, string>;
  github?: KoreFile;
  lastUpdate?: number;
  isUpdating: boolean;
}

export const initialState: ChangesState = {
  changes: new Map(),
  isUpdating: false,
};

const _reducer = createReducer(
  initialState,
  on(registerExtensionsChange, (state, { fileName, content }) => {
    const newMap = new Map(state.changes);
    const lastUpdate = Date.now();
    const newContent = {
      meta: {
        last_update: lastUpdate,
      },
      extensions: stripBody(content),
    };
    newMap.set(fileName, JSON.stringify(newContent, null, 2));
    return { ...state, changes: newMap };
  }),
  on(registerSnippetChange, (state, { fileName, content }) => {
    const newMap = new Map(state.changes);
    newMap.set(fileName, content);
    return { ...state, changes: newMap };
  }),
  on(submitChanges, (state) => ({ ...state, isUpdating: true })),
  on(submitChangesSuccess, () => ({
    ...initialState,
  })),
  on(clearChanges, () => ({
    ...initialState,
  })),
  on(initializeGithub, (state, { accessToken }) => ({
    ...state,
    github: createKoreFile({
      adaptor: createGitHubAdaptor({
        owner: 'sannybuilder',
        repo: 'library',
        ref: 'heads/master',
        token: accessToken,
      }),
    }),
  }))
);

export function changesReducer(state: ChangesState, action: Action) {
  return _reducer(state, action);
}

function stripBody(extensions: Extension[]) {
  return extensions.map((e) => ({
    ...e,
    commands: e.commands.map((c) =>
      pickBy(
        {
          ...c,
          id: c.id,
          attrs: smash(c.attrs),
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

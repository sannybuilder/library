import { Action, createReducer, on } from '@ngrx/store';
import { pickBy } from 'lodash';

import { createGitHubAdaptor, createKoreFile, KoreFile } from '../../korefile';
import { Extension, GameLibrary } from '../../models';
import {
  clearChanges,
  initializeGithub,
  registerExtensionsChange,
  registerSnippetChange,
  submitChangesSuccess,
} from './actions';

export interface ChangesState {
  changes: Map<string, string>;
  github?: KoreFile;
  lastUpdate?: number;
}

export const initialState: ChangesState = {
  changes: new Map(),
};

const _reducer = createReducer(
  initialState,
  on(registerExtensionsChange, (state, { extensions, game }) => {
    const newMap = new Map(state.changes);
    const lastUpdate = Date.now();
    const newContent = {
      meta: {
        last_update: lastUpdate,
      },
      extensions: stripBody(extensions),
    };
    newMap.set(GameLibrary[game], JSON.stringify(newContent, null, 2));
    return { ...state, changes: newMap };
  }),
  on(submitChangesSuccess, (state, { lastUpdate }) => ({
    ...state,
    lastUpdate,
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
          attrs: pickBy(c.attrs, (x) => x),
          class: c.attrs.is_unsupported ? null : c.class,
          member: c.attrs.is_unsupported ? null : c.member,
          short_desc: c.attrs.is_unsupported ? null : c.short_desc,
        },
        (x) => x !== null && (!Array.isArray(x) || x.length > 0)
      )
    ),
  }));
}

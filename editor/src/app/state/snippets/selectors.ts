import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SnippetsState } from './reducer';

export const state = createFeatureSelector('snippets');

export const snippets = createSelector(
  state,
  (state: SnippetsState, props: { extension: string; opcode: string }) => {
    return (
      state.extensionSnippets?.[props.extension]?.[props.opcode]?.snippet ?? ''
    );
  }
);

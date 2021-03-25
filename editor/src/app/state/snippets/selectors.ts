import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Game } from '../../models';
import { game } from '../ui/selectors';
import { SnippetsState } from './reducer';

export const state = createFeatureSelector('snippets');

export const snippets = createSelector(
  state,
  game,
  (
    state: SnippetsState,
    game: Game,
    props: { extension: string; opcode: string }
  ) => {
    return (
      state.extensionSnippets[game]?.[props.extension]?.[props.opcode] ?? ''
    );
  }
);

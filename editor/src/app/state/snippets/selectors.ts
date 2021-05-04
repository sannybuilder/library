import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Game } from '../../models';
import { game } from '../game/selectors';
import { SnippetsState } from './reducer';

export const state = createFeatureSelector<SnippetsState>('snippets');

export const snippets = createSelector(
  state,
  game,
  (
    state: SnippetsState,
    game: Game | undefined,
    props: { extension: string; opcode: string }
  ) => {
    return game
      ? state.extensionSnippets[game]?.[props.extension]?.[props.opcode] ?? ''
      : '';
  }
);

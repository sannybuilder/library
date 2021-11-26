import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Game, Platform, Version } from '../../models';
import { game } from '../game/selectors';
import { GameState, VersionState } from './reducer';

export const state = createFeatureSelector<VersionState>('version');

const gameState = createSelector(
  state,
  game,
  (state: VersionState, game: Game | undefined) =>
    game ? state.games[game] : undefined
);
export const selectedPlatforms = createSelector(
  gameState,
  (state: GameState | undefined) => state?.selectedPlatforms
);

export const isPlatformSelected = createSelector(
  selectedPlatforms,
  (selectedPlatforms: string[] | undefined, props: { platform: Platform }) =>
    selectedPlatforms?.includes(props.platform)
);

export const selectedVersions = createSelector(
  gameState,
  (state: GameState | undefined) => state?.selectedVersions
);

export const isVersionSelected = createSelector(
  selectedVersions,
  (selectedVersions: string[] | undefined, props: { version: Version }) =>
    selectedVersions?.includes(props.version)
);

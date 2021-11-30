import { createAction, props } from '@ngrx/store';
import { Game, Platform, Version } from '../../models';

export const selectPlatforms = createAction(
  '[version] change platforms selection',
  props<{ game: Game; platforms: Platform[]; state: boolean }>()
);

export const selectVersions = createAction(
  '[version] change versions selection',
  props<{ game: Game; versions: Version[]; state: boolean }>()
);

export const preselectFiltersByGame = createAction(
  '[version] preselect filters by game',
  props<{ game: Game }>()
);

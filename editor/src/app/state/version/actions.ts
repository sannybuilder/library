import { createAction, props } from '@ngrx/store';
import { Game, GameName, Platform, Version } from '../../models';

export const selectPlatforms = createAction(
  '[version] change platforms selection',
  props<{ game: Game; platforms: Platform[]; state: boolean }>()
);

export const selectVersions = createAction(
  '[version] change versions selection',
  props<{ game: Game; versions: Version[]; state: boolean }>()
);

export const preselectFiltersByGameName = createAction(
  '[version] preselect filters by game name',
  props<{ gameName: GameName }>()
);

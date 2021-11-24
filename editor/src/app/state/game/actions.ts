import { createAction, props } from '@ngrx/store';
import { Game, Platform, SupportInfo, Version } from '../../models';

export const onListEnter = createAction(
  '[game] on list enter',
  props<{
    game: Game;
    gameName?: string;
    extension: string;
    opcode?: string;
    enumName?: string;
    className?: string;
    action?: string;
    searchTerm?: string;
    platforms?: Platform[];
    versions?: Version[];
  }>()
);

export const loadSupportInfo = createAction(
  '[game] load support info',
  props<{ game: Game }>()
);

export const loadSupportInfoSuccess = createAction(
  '[game] load support info success',
  props<{ supportInfo: SupportInfo }>()
);

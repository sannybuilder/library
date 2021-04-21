import { createAction, props } from '@ngrx/store';
import { Game, SupportInfo } from '../../models';

export const onListEnter = createAction(
  '[game] on list enter',
  props<{
    game: Game;
    extension: string;
    opcode?: string;
    enumName?: string;
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

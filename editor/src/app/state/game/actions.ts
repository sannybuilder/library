import { createAction, props } from '@ngrx/store';
import { Game, SupportInfo } from '../../models';

export const onListEnter = createAction(
  'on list enter',
  props<{ game: Game; opcode: string; extension: string }>()
);

export const loadSupportInfo = createAction(
  'load support info',
  props<{ game: Game }>()
);

export const loadSupportInfoSuccess = createAction(
  'load support info success',
  props<{ supportInfo: SupportInfo }>()
);

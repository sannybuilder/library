import { createAction, props } from '@ngrx/store';
import { Command, Game, Modifier, SupportInfo, ViewMode } from '../../models';

export const toggleExtension = createAction(
  'toggle extension selection',
  props<{ extension: string }>()
);

export const toggleFilter = createAction(
  'toggle filter selection',
  props<{ filter: string; modifier: Modifier }>()
);

export const updateSearchTerm = createAction(
  'update search term',
  props<{ term: string }>()
);

export const toggleCommandListElements = createAction(
  'toggle command list elements',
  props<{ flag: boolean }>()
);

export const displayOrEditCommandInfo = createAction(
  'display or edit command',
  props<{ command: Command; extension: string; viewMode: ViewMode }>()
);

export const displayOrEditSnippet = createAction(
  'display or edit snippet',
  props<{ snippet: string }>()
);

export const stopEditOrDisplay = createAction('stop edit or display');

export const onListEnter = createAction(
  'on list enter',
  props<{ game: Game; opcode: string; extension: string }>()
);

export const updateLastUpdateTime = createAction(
  'update last update time',
  props<{ lastUpdate: number }>()
);

export const loadSupportInfo = createAction(
  'load support info',
  props<{ game: Game }>()
);

export const loadSupportInfoSuccess = createAction(
  'load support info success',
  props<{ supportInfo: SupportInfo }>()
);

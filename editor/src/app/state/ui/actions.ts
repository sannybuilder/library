import { createAction, props } from '@ngrx/store';
import { Command, Game, Modifier, ViewMode } from '../../models';

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

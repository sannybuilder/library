import { createAction, props } from '@ngrx/store';
import {
  ViewContext,
  Game,
  JsonModel,
  Platform,
  Version,
} from '../../models';

export const onListEnter = createAction(
  '[game] on list enter',
  props<{
    game: Game;
    extension?: string;
    id?: string;
    enumName?: string;
    className?: string;
    action?: string | null;
    searchTerm?: string;
    platforms?: Platform[];
    versions?: Version[];
    rail?: string;
    viewContext?: ViewContext;
    jsonModel?: JsonModel;
  }>()
);

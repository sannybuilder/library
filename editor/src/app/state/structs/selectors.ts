import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Game, ViewContext } from '../../models';
import { game, viewContext } from '../game/selectors';
import { StructsState } from './reducer';

export const state = createFeatureSelector<StructsState>('structs');

export const structs = createSelector(
  state,
  game,
  viewContext,
  (state: StructsState, game: Game | undefined, viewContext: ViewContext) =>
    game && viewContext === ViewContext.Code
      ? state.structs[game]
      : undefined
);

export const structNames = createSelector(structs, (structs) =>
  Object.keys(structs ?? {}).sort()
);

export const gameStructs = createSelector(
  state,
  (state: StructsState, props: { game: Game }) => state.structs[props.game] ?? {}
);

export const gamesWhereExist = createSelector(
  state,
  (state: StructsState, props: { structName: string }) => {
    return Object.values(Game).filter((game: Game) =>
      !!state.structs[game]?.[props.structName]
    );
  }
);

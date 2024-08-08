import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { ViewContext, Game, GenerateJsonModel, Platform, Version } from '../../models';
import { onListEnter } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class GameFacade {
  primitiveTypes$ = this.store$.select(selector.primitiveTypes);
  game$ = this.store$.select(selector.game).pipe(
    distinctUntilChanged(),
    filter((v): v is Game => !!v)
  );
  viewContext$ = this.store$.select(selector.viewContext);

  constructor(private store$: Store) {}

  onListEnter({
    game,
    id,
    extension,
    enumName,
    className,
    action,
    searchTerm,
    platforms,
    versions,
    viewContext,
    generateJsonModel
  }: {
    game: Game;
    extension?: string;
    id?: string;
    enumName?: string;
    className?: string;
    action?: string;
    searchTerm?: string;
    platforms?: Platform[];
    versions?: Version[];
    viewContext?: ViewContext,
    generateJsonModel?: GenerateJsonModel
  }) {
    this.store$.dispatch(
      onListEnter({
        game,
        id,
        extension,
        enumName,
        className,
        action,
        searchTerm,
        platforms,
        versions,
        viewContext,
        generateJsonModel
      })
    );
  }
}

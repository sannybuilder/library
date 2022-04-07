import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Game, GenerateJsonModel, Platform, Version } from '../../models';
import { onListEnter } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class GameFacade {
  primitiveTypes$ = this.store$.select(selector.primitiveTypes);
  game$ = this.store$.select(selector.game).pipe(
    distinctUntilChanged(),
    filter((v): v is Game => !!v)
  );

  constructor(private store$: Store) {}

  onListEnter({
    game,
    opcode,
    extension,
    enumName,
    className,
    action,
    searchTerm,
    platforms,
    versions,
    generateJsonModel
  }: {
    game: Game;
    extension?: string;
    opcode?: string;
    enumName?: string;
    className?: string;
    action?: string;
    searchTerm?: string;
    platforms?: Platform[];
    versions?: Version[];
    generateJsonModel?: GenerateJsonModel
  }) {
    this.store$.dispatch(
      onListEnter({
        game,
        opcode,
        extension,
        enumName,
        className,
        action,
        searchTerm,
        platforms,
        versions,
        generateJsonModel
      })
    );
  }
}

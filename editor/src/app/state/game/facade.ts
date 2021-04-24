import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { Command, Game } from '../../models';
import { onListEnter } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class GameFacade {
  supportInfo$ = this.store$.select(selector.supportInfo);
  primitiveTypes$ = this.store$.select(selector.primitiveTypes);
  game$ = this.store$
    .select(selector.game)
    .pipe(distinctUntilChanged(), filter<Game>(Boolean));

  constructor(private store$: Store) {}

  onListEnter({
    game,
    opcode,
    extension,
    enumName,
    className,
  }: {
    game: Game;
    extension: string;
    opcode?: string;
    enumName?: string;
    className?: string;
  }) {
    this.store$.dispatch(
      onListEnter({ game, opcode, extension, enumName, className })
    );
  }

  getCommandSupportInfo(command: Command, extension: string) {
    return this.store$.select(selector.commandSupportInfo, {
      command,
      extension,
    });
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { displayOrEditCommandInfo, stopEditOrDisplay } from './actions';
import { map, switchMap } from 'rxjs/operators';
import { UiFacade } from './facade';
import { ViewMode } from '../../models';
import { combineLatest } from 'rxjs';
import {
  loadExtensions,
  loadExtensionsSuccess,
  updateCommand,
} from '../extensions/actions';
import { loadSnippets } from '../snippets/actions';

@Injectable()
export class UiEffects {
  viewOpcodeOnLoad$ = createEffect(() =>
    combineLatest([
      this._actions$.pipe(ofType(loadExtensionsSuccess)),
      this._ui.opcodeOnLoad$,
    ]).pipe(
      map(([{ extensions }, { opcode, extension }]) => {
        const command = extensions
          .find((e) => e.name === extension)
          ?.commands.find((command) => command.id === opcode);

        if (command) {
          return displayOrEditCommandInfo({
            command,
            extension,
            viewMode: ViewMode.View,
          });
        } else {
          return stopEditOrDisplay();
        }
      })
    )
  );

  onGameChange$ = createEffect(() =>
    this._ui.game$.pipe(
      switchMap((game) => [loadExtensions({ game }), loadSnippets({ game })])
    )
  );

  updateCommand$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateCommand),
      map(({ command, newExtension: extension }) =>
        displayOrEditCommandInfo({
          command,
          extension,
          viewMode: ViewMode.Edit,
        })
      )
    )
  );

  constructor(private _actions$: Actions, private _ui: UiFacade) {}
}

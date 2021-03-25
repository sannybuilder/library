import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  displayOrEditCommandInfo,
  displayOrEditSnippet,
  loadSupportInfo,
  loadSupportInfoSuccess,
  stopEditOrDisplay,
} from './actions';
import { filter, map, switchMap } from 'rxjs/operators';
import { UiFacade } from './facade';
import { ViewMode } from '../../models';
import { combineLatest } from 'rxjs';
import { loadExtensionsSuccess, updateCommand } from '../extensions/actions';
import { SnippetsFacade } from '../snippets/facade';
import { UiService } from './service';

@Injectable({ providedIn: 'root' })
export class UiEffects {
  viewOpcodeOnLoad$ = createEffect(() =>
    combineLatest([
      this._actions$.pipe(ofType(loadExtensionsSuccess)),
      this._ui.opcodeOnLoad$,
      this._ui.game$,
    ]).pipe(
      filter(([{ game }, _, currGame]) => game === currGame),
      map(([{ extensions }, { opcode, extension }]) => {
        const command = extensions
          .find((e) => e.name === extension)
          ?.commands.find(({ id }) => id === opcode);

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
    this._ui.game$.pipe(map((game) => loadSupportInfo({ game })))
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

  displayOrEditSnippet$ = createEffect(() =>
    this._actions$.pipe(
      ofType(displayOrEditCommandInfo),
      switchMap(({ command, extension }) =>
        this._snippets.getSnippet(extension, command.id)
      ),
      map((snippet) => displayOrEditSnippet({ snippet }))
    )
  );

  loadSupportInfo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadSupportInfo),
      switchMap(({ game }) => this._service.loadSupportInfo(game)),
      map((supportInfo) => loadSupportInfoSuccess({ supportInfo }))
    )
  );

  constructor(
    private _actions$: Actions,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _service: UiService
  ) {}
}

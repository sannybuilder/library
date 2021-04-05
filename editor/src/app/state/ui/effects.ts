import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  changePage,
  displayOrEditCommandInfo,
  displayOrEditSnippet,
  loadSupportInfo,
  loadSupportInfoSuccess,
  onListEnter,
  scrollTop,
  stopEditOrDisplay,
  toggleFilter,
  updateSearchTerm,
} from './actions';
import { filter, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { UiFacade } from './facade';
import { ViewMode } from '../../models';
import { combineLatest, merge } from 'rxjs';
import {
  loadExtensionsSuccess,
  toggleExtension,
  updateCommand,
} from '../extensions/actions';
import { SnippetsFacade } from '../snippets/facade';
import { UiService } from './service';
import { ExtensionsFacade } from '../extensions/facade';

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

  resetPagination$ = createEffect(() =>
    merge(
      this._actions$.pipe(
        ofType(toggleFilter, toggleExtension, updateSearchTerm)
      ),
      this._actions$.pipe(ofType(onListEnter)).pipe(filter((x) => !x.opcode))
    ).pipe(mapTo(changePage({ index: 1 })))
  );

  commandPage$ = createEffect(() =>
    combineLatest([
      this._extensions.rows$,
      this._ui.commandToDisplayOrEdit$,
    ]).pipe(
      map(([rows, command]) =>
        rows.findIndex((row) => row.command?.id === command.command?.id)
      ),
      filter((index) => index >= 0),
      map((index) => changePage({ index: Math.ceil((index + 1) / 100) }))
    )
  );

  scrollTop$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(scrollTop),
        tap(() => {
          window.scroll(0, 0);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _service: UiService,
    private _extensions: ExtensionsFacade
  ) {}
}

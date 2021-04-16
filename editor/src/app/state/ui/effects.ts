import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  changePage,
  displayOrEditCommandInfo,
  displayOrEditSnippet,
  resetFilters,
  scrollTop,
  selectExtension,
  stopEditOrDisplay,
  toggleFilter,
  updateSearchTerm,
} from './actions';
import {
  filter,
  map,
  mapTo,
  pairwise,
  switchMap,
  tap,
  withLatestFrom,
  startWith,
  groupBy,
  mergeMap,
  take,
} from 'rxjs/operators';
import { UiFacade } from './facade';
import { Extension, Game, ViewMode } from '../../models';
import { combineLatest, merge } from 'rxjs';
import { loadExtensionsSuccess, updateCommand } from '../extensions/actions';
import { SnippetsFacade } from '../snippets/facade';
import { ExtensionsFacade } from '../extensions/facade';
import { ChangesFacade } from '../changes/facade';
import { DOCUMENT } from '@angular/common';
import { onListEnter } from '../game/actions';
import { GameFacade } from '../game/facade';

@Injectable({ providedIn: 'root' })
export class UiEffects {
  viewOpcodeOnLoad$ = createEffect(() =>
    combineLatest([
      this._actions$.pipe(ofType(loadExtensionsSuccess)),
      this._ui.opcodeOnLoad$,
      this._game.game$,
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

  resetPagination$ = createEffect(() =>
    merge(
      this._actions$.pipe(
        ofType(toggleFilter, selectExtension, updateSearchTerm)
      ),
      this._actions$.pipe(ofType(onListEnter)).pipe(filter((x) => !x.opcode))
    ).pipe(mapTo(changePage({ index: 1 })))
  );

  commandPage$ = createEffect(() =>
    combineLatest([this._ui.rows$, this._ui.commandToDisplayOrEdit$]).pipe(
      map(([rows, command]) =>
        rows?.findIndex((row) => row.command?.id === command?.id)
      ),
      withLatestFrom(this._ui.currentPage$),
      filter(([index, currentPage]) => index >= 0 && currentPage !== index),
      map(([index]) => changePage({ index: Math.ceil((index + 1) / 100) }))
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

  changesCount$ = createEffect(
    () =>
      this._changes.changesCount$.pipe(
        tap((changesCount) => {
          this._d.body.classList[changesCount > 0 ? 'add' : 'remove'](
            'has-unsubmitted-changes'
          );
        })
      ),
    { dispatch: false }
  );

  /**
   * for each game, subscribe to extension list changes
   * then calculate a diff between previous and current extensions
   * and update selected extensions accordingly
   */
  extensionChanges$ = createEffect(() =>
    this._game.game$.pipe(
      groupBy((game) => game),
      mergeMap((game$) =>
        game$.pipe(
          mergeMap((game) =>
            this._extensions
              .getGameExtensions(game)
              .pipe(map((extensions) => ({ extensions, game })))
          ),
          startWith({ extensions: [] as Extension[] }),
          pairwise(),
          switchMap(
            ([prev, curr]: [
              { extensions: Extension[] },
              { extensions: Extension[]; game: Game }
            ]) => {
              const p = prev.extensions.map(({ name }) => name);
              const c = curr.extensions.map(({ name }) => name);
              const game = curr.game;

              const added = c.filter((e) => !p.includes(e));
              const removed = p.filter((e) => !c.includes(e));

              // combine into 1-2 actions
              return [
                ...added.map((extension) =>
                  selectExtension({ game, extension, state: true })
                ),
                ...removed.map((extension) =>
                  selectExtension({ game, extension, state: false })
                ),
              ];
            }
          )
        )
      )
    )
  );

  resetFilters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(resetFilters),
      withLatestFrom(this._extensions.extensionNames$, this._game.game$),
      switchMap(([_, extensions, game]) =>
        extensions.map((extension) =>
          selectExtension({ game, extension, state: true })
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _extensions: ExtensionsFacade,
    private _changes: ChangesFacade,
    private _game: GameFacade,
    @Inject(DOCUMENT) private _d: Document
  ) {}
}

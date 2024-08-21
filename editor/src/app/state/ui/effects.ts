import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, merge } from 'rxjs';
import {
  changePage,
  displayClassesList,
  displayClassOverview,
  displayDecisionTree,
  displayEnumsList,
  displayExtensionList,
  displayJsonGenerator,
  displayOrEditCommandInfo,
  displayOrEditEnum,
  displayOrEditSnippet,
  generateNewJson,
  resetFilters,
  scrollTop,
  selectClass,
  selectExtensions,
  stopEditOrDisplay,
  toggleAttribute,
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
  first,
  take,
} from 'rxjs/operators';

import {
  Command,
  Entity,
  Enums,
  Extension,
  Game,
  Platform,
  Version,
  ViewContext,
  ViewMode,
} from '../../models';

import {
  capitalizeFirst,
  isOpcode,
  isPlatformMatchingExact,
  isSupported,
  isVersionMatchingExact,
} from '../../utils';
import { flatMap } from 'lodash';
import { UiFacade } from './facade';
import { SnippetsFacade } from '../snippets/facade';
import { ExtensionsFacade } from '../extensions/facade';
import { ChangesFacade } from '../changes/facade';
import { onListEnter } from '../game/actions';
import { GameFacade } from '../game/facade';
import { EnumsFacade } from '../enums/facade';
import { loadEnumsSuccess } from '../enums/actions';
import { ArticlesFacade } from '../articles/facade';
import { AnalyticsService } from '../../analytics';

@Injectable({ providedIn: 'root' })
export class UiEffects {
  viewOnLoad$ = createEffect(() =>
    this._actions$.pipe(
      ofType(onListEnter),
      withLatestFrom(this._ui.canEdit$, this._game.game$),
      switchMap(
        ([
          {
            id,
            extension,
            enumName,
            className,
            action,
            searchTerm,
            platforms,
            versions,
            generateJsonModel,
          },
          canEdit,
          game,
        ]) => {
          if (searchTerm) {
            this._ui.updateSearch(searchTerm, true);
          }
          if (action === 'decision-tree') {
            return [displayDecisionTree()];
          }
          if (action === 'generate-json') {
            if (generateJsonModel) {
              return [generateNewJson({ model: generateJsonModel })];
            }
            return [displayJsonGenerator()];
          }
          if (enumName) {
            if (enumName === 'all') {
              return [displayEnumsList()];
            }
            return this._enums.enums$.pipe(
              first((v): v is Enums => !!v),
              map((enums) => {
                const name =
                  enumName.toLowerCase() === 'new'
                    ? ''
                    : capitalizeFirst(enumName);
                const enumToEdit = enums[name];
                const isNew = !enumToEdit;

                if (isNew) {
                  if (!canEdit) {
                    return stopEditOrDisplay();
                  }
                  return displayOrEditEnum({
                    enumToEdit: { isNew, name, fields: [] },
                    viewMode: ViewMode.EditEnum,
                  });
                }

                return displayOrEditEnum({
                  enumToEdit: {
                    isNew,
                    name,
                    fields: Object.entries(enumToEdit),
                  },
                  viewMode:
                    action === 'edit' ? ViewMode.EditEnum : ViewMode.ViewEnum,
                });
              })
            );
          }

          if (className) {
            if (className === 'all') {
              return [displayClassesList()];
            }
            return this._extensions.entities$.pipe(
              first((v): v is Record<string, Entity[]> => !!v),
              map((entities) => {
                if (flatMap(entities).some((e) => e.name === className)) {
                  return displayClassOverview({ className });
                } else {
                  return stopEditOrDisplay();
                }
              })
            );
          }

          if (id && extension) {
            return this._extensions.extensions$.pipe(
              first<Extension[]>(Boolean),
              map((extensions) => {
                if (id?.toLowerCase() === 'new') {
                  id = '';
                }
                const neededPlatforms = platforms ?? [Platform.Any];
                const neededVersions = versions ?? [Version.Any];

                const opcode = id && isOpcode(id) ? id : undefined;
                const commandName = id && !isOpcode(id) ? id : undefined;

                const commandToEdit = extensions
                  .find((e) => e.name === extension)
                  ?.commands.find(
                    (command) =>
                      ((opcode && command.id === opcode) ||
                        (commandName && command.name === commandName)) &&
                      isPlatformMatchingExact(command, neededPlatforms) &&
                      isVersionMatchingExact(command, neededVersions)
                  );

                const isNew = !commandToEdit;
                if (isNew) {
                  if (!canEdit) {
                    return stopEditOrDisplay();
                  }
                  return displayOrEditCommandInfo({
                    extension,
                    command: {
                      id: opcode || '',
                      name: commandName || '',
                      num_params: 0,
                    },
                    viewMode: ViewMode.EditCommand,
                  });
                }

                return displayOrEditCommandInfo({
                  extension,
                  command: commandToEdit!,
                  viewMode:
                    action === 'edit'
                      ? ViewMode.EditCommand
                      : ViewMode.ViewCommand,
                });
              })
            );
          }

          if (extension === 'all') {
            return [displayExtensionList()];
          }
          // toggle extensions
          return this._extensions.extensions$.pipe(
            tap((extensions) => {
              const extensionNames = extensions.map((e) => e.name);
              if (extension) {
                this._ui.selectExtensions(
                  game,
                  extensionNames.filter((name) => name !== extension),
                  false,
                  extensionNames
                );
                this._ui.selectExtensions(
                  game,
                  [extension],
                  true,
                  extensionNames
                );
              } else {
                this._ui.selectExtensions(
                  game,
                  extensionNames,
                  true,
                  extensionNames
                );
              }
            }),
            map(() => stopEditOrDisplay())
          );
        }
      )
    )
  );

  displayOrEditSnippet$ = createEffect(() =>
    this._actions$.pipe(
      ofType(displayOrEditCommandInfo),
      switchMap(({ command, extension }) =>
        this._snippets.getSnippet(extension, command.id || command.name)
      ),
      map((snippet) => displayOrEditSnippet({ snippet }))
    )
  );

  displayOrEditArticle$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(displayOrEditCommandInfo),
        filter(({ viewMode }) => viewMode === ViewMode.ViewCommand),
        withLatestFrom(this._game.game$),
        tap(([{ command }, game]) => {
          if (isSupported(command.attrs)) {
            this._articles.loadArticle(command.name);
          }
          this._analytics.trackEvent('command_view', {
            name: command.name,
            game: game,
          });
        })
      ),
    { dispatch: false }
  );

  preloadEnums$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(displayOrEditEnum),
        withLatestFrom(this._game.viewContext$),
        filter(([_, viewContext]) => viewContext === ViewContext.Script),
        first(([{ viewMode }]) => viewMode === ViewMode.EditEnum),
        tap(() => {
          Object.values(Game).forEach((game) => {
            this._extensions.loadExtensions(game);
          });
          Object.values(Game).forEach((game) => {
            this._enums.loadEnums(game);
          });
        })
      ),
    { dispatch: false }
  );

  // we need to preload extensions and enums for cross-edits to work
  preloadExtensions$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(displayOrEditCommandInfo),
        withLatestFrom(this._game.viewContext$),
        filter(([_, viewContext]) => viewContext === ViewContext.Script),
        first(([{ viewMode }]) => viewMode === ViewMode.EditCommand),
        tap(() => {
          Object.values(Game).forEach((game) => {
            this._extensions.loadExtensions(game);
          });
        })
      ),
    { dispatch: false }
  );

  resetPagination$ = createEffect(() =>
    merge(
      this._actions$.pipe(
        ofType(toggleAttribute, selectExtensions, selectClass, updateSearchTerm)
      ),
      this._game.game$ // needed as the current page may not exist in the chosen game resulting in the empty list
    ).pipe(mapTo(changePage({ index: 1 })))
  );

  commandPage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(displayOrEditCommandInfo),
      withLatestFrom(this._ui.rows$),
      map(([{ command }, rows]) => {
        const finder = command.id
          ? (c: Command) => c.id === command.id
          : (c: Command) => c.name === command.name;
        return rows?.findIndex((row) => finder(row.command));
      }),
      withLatestFrom(this._ui.currentPage$),
      filter(
        ([index, currentPage]) =>
          index !== undefined && index >= 0 && currentPage !== index
      ),
      map(([index]) => changePage({ index: Math.ceil((index! + 1) / 100) }))
    )
  );

  updateSearchTerm$ = createEffect(() =>
    this._actions$.pipe(
      ofType(updateSearchTerm),
      filter(({ autoOpenSingleResult }) => !!autoOpenSingleResult),
      switchMap(() =>
        // note: flatten this observable to make this logic only work once in the app lifetime
        this._ui.selectedExtensions$.pipe(
          filter((e) => !!e?.length),
          take(1),
          switchMap(() => this._ui.rows$),
          take(1),
          filter((rows) => rows?.length === 1)
        )
      ),
      map((rows) =>
        displayOrEditCommandInfo({
          command: rows![0].command,
          extension: rows![0].extension!,
          viewMode: ViewMode.ViewCommand,
        })
      )
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

  hasChanges$ = createEffect(
    () =>
      this._changes.hasChanges$.pipe(
        tap((hasChanges) => {
          this._d.body.classList[hasChanges ? 'add' : 'remove'](
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
          pairwise<{ extensions: Extension[]; game?: Game }>(),
          switchMap(([prev, curr]) => {
            const p = prev.extensions.map(({ name }) => name);
            const c = curr.extensions.map(({ name }) => name);
            const game = curr.game!;

            const added = c.filter((e) => !p.includes(e));
            const removed = p.filter((e) => !c.includes(e));

            return [
              selectExtensions({
                game,
                extensions: added,
                state: true,
                extensionNames: c,
              }),
              selectExtensions({
                game,
                extensions: removed,
                state: false,
                extensionNames: c,
              }),
            ].filter(({ extensions }) => extensions.length > 0);
          })
        )
      )
    )
  );

  resetFilters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(resetFilters),
      withLatestFrom(this._extensions.extensionNames$, this._game.game$),
      map(([_, extensions, game]) =>
        selectExtensions({
          game,
          extensions,
          state: true,
          extensionNames: extensions,
        })
      )
    )
  );

  generateNewJson$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(generateNewJson),
        switchMap(({ model }) => {
          return combineLatest([
            this._game.game$,
            this._extensions.extensions$,
            this._extensions.version$,
            this._extensions.lastUpdate$,
            this._extensions.classesMeta$,
          ]).pipe(
            take(1),
            tap(([game, extensions, version, last_update, classes]) => {
              const { selectedExtensions } = model;

              const content = {
                meta: {
                  version,
                  last_update,
                  url: 'https://library.sannybuilder.com/#/' + game,
                },
                extensions: extensions.filter((e: any) =>
                  selectedExtensions.includes(e.name)
                ),
                classes,
              };

              const element = document.createElement('a');
              element.setAttribute(
                'href',
                'data:text/plain;charset=utf-8,' +
                  encodeURIComponent(JSON.stringify(content, null, 2))
              );
              element.setAttribute('download', model.fileName);
              element.style.display = 'none';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            })
          );
        })
      ),
    { dispatch: false }
  );

  loadEnumsSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadEnumsSuccess),
      withLatestFrom(
        this._ui.enumToDisplayOrEdit$,
        this._ui.viewMode$,
        this._game.game$
      ),
      filter(
        ([{ enums, game }, enumToEdit, viewMode, currentGame]) =>
          !!enumToEdit &&
          !!enumToEdit.name &&
          !!enums &&
          !!enums[enumToEdit.name] &&
          game === currentGame
      ),
      map(([{ enums }, enumToEdit, viewMode]) => {
        let { isNew, name } = enumToEdit!;
        return displayOrEditEnum({
          enumToEdit: {
            isNew,
            name,
            fields: Object.entries(enums![enumToEdit!.name!]),
          },
          viewMode,
        });
      })
    )
  );

  constructor(
    private _actions$: Actions,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _extensions: ExtensionsFacade,
    private _changes: ChangesFacade,
    private _game: GameFacade,
    private _enums: EnumsFacade,
    private _articles: ArticlesFacade,
    private _analytics: AnalyticsService,
    @Inject(DOCUMENT) private _d: Document
  ) {}
}

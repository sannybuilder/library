import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { combineLatest, Observable, of, Subject, zip } from 'rxjs';
import {
  takeUntil,
  map,
  switchMap,
  withLatestFrom,
  take,
} from 'rxjs/operators';
import { cloneDeep, isEqual, omit, uniqBy, orderBy, flatten } from 'lodash';

import {
  Command,
  Enum,
  EnumRaw,
  ViewContext,
  Game,
  GenerateJsonModel,
  ParamType,
  Primitive,
  ViewMode,
  SyntaxKind,
  GameSourceRepo,
  DEFAULT_EXTENSION,
  SnippetsRepo,
} from '../../models';
import {
  ExtensionsFacade,
  SnippetsFacade,
  UiFacade,
  GameFacade,
  EnumsFacade,
  TreeFacade,
  ArticlesFacade,
  ChangesFacade,
} from '../../state';
import {
  doesGameHaveNativeDocs,
  doesGameRequireOpcode,
  SEARCH_OPTIONS,
  getBaseGames,
  getDefaultExtension,
  getQueryParamsForCommand,
  isOtherGame,
  serializeUrlAndParams,
} from '../../utils';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class LibraryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidebar') sidebar: ElementRef<HTMLDivElement>;

  ViewMode = ViewMode;
  ViewContext = ViewContext;
  onDestroy$ = new Subject();
  snippet$ = this._ui.snippetToDisplayOrEdit$;
  extensionNames$ = this._extensions.extensionNames$;
  classToDisplay$ = this._ui.classToDisplay$;
  classCommands$ = this._ui.classToDisplayCommands$;
  game$ = this._game.game$;
  viewContext$ = this._game.viewContext$;
  canEdit$ = this._ui.canEdit$;
  viewMode$ = this._ui.viewMode$;
  enumNames$ = this._enums.enumNames$;
  extensions$ = this._extensions.extensions$;
  extensionTypes$ = this._extensions.extensionTypes$;
  displayInlineDescription$ = this._ui.displayInlineMethodDescription$;
  isHotkeyInfoDismissed$ = this._ui.isHotkeyInfoDismissed$;
  selectedSyntaxKind$ = this._ui.selectedSyntaxKind$;
  extensionToCreateCommands$ = this._ui.selectedExtensions$.pipe(
    withLatestFrom(this._game.viewContext$),
    map(([selectedExtensions, viewContext]) => {
      if (selectedExtensions?.length === 1 && selectedExtensions[0] !== 'any') {
        return selectedExtensions[0];
      }
      return this.getDefaultExtension(viewContext);
    })
  );
  entities$: Observable<Array<{ origin: string; name: string }>> =
    this._extensions.extensionNames$.pipe(
      switchMap((extensions) =>
        this.getExtensionsEntities(extensions).pipe(
          switchMap((entities) =>
            zip(
              ...entities.map((e) =>
                this.getClassOrigin(e.name).pipe(
                  map((origin) => ({ origin, name: e.name }))
                )
              )
            )
          )
        )
      ),
      map((entities) => orderBy(entities, 'name'))
    );

  classAndEnumNames$ = combineLatest([this.entities$, this.enumNames$]).pipe(
    map(([entities, enums]) => ({
      enums,
      entities: entities.map((e) => e.name),
    }))
  );

  displaySearchHelp$ = this._ui.displaySearchHelp$;
  isSidebarCollapsed$ = this._ui.isSidebarCollapsed$;
  canGoBackInDecisionTree$ = this._tree.currentNode$.pipe(
    map((node) => node && node.id !== 'root')
  );
  isCustomFilterSelected$ = this._ui.isCustomFilterSelected$;

  command?: Command;
  oldCommand?: Command;
  snippet?: string;
  oldSnippet?: string;
  extension?: string;
  oldExtension?: string;
  enumToDisplayOrEdit?: EnumRaw;
  oldEnumToEdit?: EnumRaw;
  screenSize: number;
  editorHasError = false;
  generateJsonModel: GenerateJsonModel;
  updateRelatedCommands = true;
  isFullScreenMode = false;

  constructor(
    private _extensions: ExtensionsFacade,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _game: GameFacade,
    private _tree: TreeFacade,
    private _enums: EnumsFacade,
    private _ref: ChangeDetectorRef,
    private _el: ElementRef,
    private _articles: ArticlesFacade,
    private _changes: ChangesFacade
  ) {}

  ngOnInit() {
    this._extensions.init();
    this._enums.loadEnumsInfo();
    this._changes.loadGitTree();
  }

  ngOnDestroy() {
    this.onDestroy$.next(undefined);
    this.onDestroy$.complete();
    this._ui.toggleCommandListElements(false);
  }

  ngAfterViewInit(): void {
    this.detectScreenSize();
    this._ui.toggleCommandListElements(true);

    this.game$.pipe(takeUntil(this.onDestroy$)).subscribe((game) => {
      if (isOtherGame(game)) {
        this._snippets.loadSnippets(game);
      } else {
        getBaseGames().forEach((game) => {
          this._snippets.loadSnippets(game);
        });
      }
    });

    this.snippet$.pipe(takeUntil(this.onDestroy$)).subscribe((snippet) => {
      this.snippet = snippet;
      this.oldSnippet = snippet;
      this._ref.detectChanges();
    });

    this.displaySearchHelp$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((shouldDisplay) => {
        (this._el.nativeElement as HTMLElement).classList.toggle(
          'd-none',
          shouldDisplay
        );
      });

    this._ui.enumToDisplayOrEdit$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((enumToEdit) => {
        this.enumToDisplayOrEdit = cloneDeep(enumToEdit);
        this.oldEnumToEdit = cloneDeep(enumToEdit);
        this._ref.detectChanges();
      });

    combineLatest([
      this._ui.commandToDisplayOrEdit$,
      this._ui.extensionToDisplayOrEdit$,
    ])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([command, extension]) => {
        this.command = command
          ? { input: [], output: [], ...cloneDeep(command) }
          : command;
        this.oldCommand = cloneDeep(this.command);
        this.oldExtension = extension;
        this.extension = extension;
        this._ref.detectChanges();
      });
  }

  onSave(game: Game, viewMode: ViewMode) {
    if (viewMode === ViewMode.EditCommand) {
      this._onSaveCommand(game);
    }
    if (viewMode === ViewMode.EditEnum) {
      this._onSaveEnum();
    }
  }

  onDeleteEnum() {
    this.enumToDisplayOrEdit = { name: '', fields: [], isNew: false };
    this._onSaveEnum();
  }

  onCloneEnum(game: Game) {
    this._enums.cloneEnum({ enumToClone: this.enumToDisplayOrEdit!, game });
  }

  onCloneCommand(game: Game) {
    this._extensions.cloneCommand({
      game,
      command: this.command!,
      extension: this.extension!,
    });
  }

  onCopyFromCommand(game: Game) {
    const name = this.command?.name;
    if (!name) {
      return;
    }
    this._extensions
      .getGameExtensions(game)
      .pipe(take(1))
      .subscribe((extensions) => {
        for (const extension of extensions) {
          for (const command of extension.commands) {
            if (command.name === name) {
              this.command = {
                ...cloneDeep(command),
                id: this.command?.id || command.id,
              };
              return;
            }
          }
        }
      });
  }

  onCancel() {
    this._ui.stopEditOrDisplay();
  }

  getSnippet(extension: string, id: string) {
    return this._snippets.getSnippet(extension, id);
  }
  getExtensionsEntities(extensions: string[]) {
    return (
      extensions?.length
        ? zip(
            ...extensions.map((e) => this._extensions.getExtensionEntities(e))
          )
        : of([])
    ).pipe(
      map((entities) =>
        uniqBy(orderBy(flatten(entities), ['type', 'name']), 'name')
      )
    );
  }

  getExtensionCommands(extension: string) {
    return this._extensions.getExtensionCommands(extension);
  }

  getExtensionTypes(...extensions: string[]): Observable<ParamType[]> {
    return combineLatest([
      this.getExtensionsEntities(extensions),
      this._game.primitiveTypes$,
      this.enumNames$,
    ]).pipe(
      map(([entities, primitiveTypes, enumNames]) => {
        const primitives: Primitive[] = primitiveTypes.map((name) => ({
          type: 'primitive',
          name,
        }));

        const enums: Enum[] = enumNames.map((name) => ({ name, type: 'enum' }));

        return [...entities, ...primitives, ...enums];
      })
    );
  }

  getCommandSupportInfo(command: Command, extension: string) {
    return this._extensions.getCommandSupportInfo(command, extension);
  }

  findRelatedCommands(command: Command, extension: string, game: Game) {
    return this._extensions.findRelatedCommands(command, extension, game);
  }

  getEnum(enumName: string) {
    return this._enums.getEnumFields(enumName);
  }

  getGamesWhereEnumExists(enumName: string) {
    return this._enums.getGamesWhereEnumExists(enumName);
  }

  getClassOrigin(className: string) {
    return this._extensions.getClassOrigin(className);
  }

  getClassMeta(game: Game, className: string) {
    return this._extensions.getClassMeta(game, className);
  }

  getClassesMeta(game: Game) {
    return this._extensions.getGameClassesMeta(game);
  }

  getGameExtensions(game: Game) {
    return this._extensions.getGameExtensions(game);
  }

  getFullDescription() {
    return combineLatest([
      this._articles.currentArticle$,
      this._articles.source$,
    ]).pipe(map((a) => a.filter(Boolean)));
  }

  @HostListener('window:resize', [])
  private detectScreenSize() {
    this.screenSize = window.innerWidth;
  }

  shouldDisableSaveButton(viewMode: ViewMode) {
    if (this.editorHasError || this.noChanges(viewMode)) {
      return true;
    }
    if (viewMode === ViewMode.EditCommand) {
      return false;
    }
    if (viewMode === ViewMode.EditEnum) {
      return false;
    }

    return true;
  }

  resetChanges(viewMode: ViewMode) {
    if (viewMode === ViewMode.EditCommand) {
      this._ui.editCommandInfo(this.oldCommand!, this.oldExtension!);
      this.snippet = this.oldSnippet;
    }
    if (viewMode === ViewMode.EditEnum) {
      this._ui.editEnum(this.oldEnumToEdit!);
    }
    return false;
  }

  noChanges(viewMode: ViewMode): boolean {
    if (viewMode === ViewMode.EditCommand) {
      return (
        isEqual(this.command, this.oldCommand) &&
        this.extension === this.oldExtension &&
        this.snippet === this.oldSnippet
      );
    }
    if (viewMode === ViewMode.EditEnum) {
      return isEqual(this.enumToDisplayOrEdit, this.oldEnumToEdit);
    }
    return true;
  }

  toggleSidebar() {
    this._ui.toggleSidebar();
  }

  toggleInlineDesc() {
    this._ui.toggleInlineMethodDescription();
    return false;
  }

  getPermaLink({
    viewMode,
    game,
    viewContext,
    extension,
    command,
    enumName,
    className,
  }: {
    viewMode: ViewMode;
    game: Game;
    viewContext: ViewContext;
    extension?: string;
    command?: Command;
    enumName?: string;
    className?: string;
  }) {
    const base = 'https://library.sannybuilder.com/#';
    const context = viewContext === ViewContext.Code ? 'native' : 'script';
    if (viewMode === ViewMode.ViewAllClasses) {
      return [base, game, context, 'classes'].join('/');
    }
    if (viewMode === ViewMode.ViewAllEnums) {
      return [base, game, context, 'enums'].join('/');
    }
    if (viewMode === ViewMode.ViewAllExtensions) {
      return [base, game, context, 'extensions'].join('/');
    }

    if (viewMode === ViewMode.ViewClass) {
      return [base, game, context, 'classes', className].join('/');
    }

    if (viewMode === ViewMode.ViewEnum) {
      return [base, game, context, 'enums', enumName].join('/');
    }

    if (viewMode === ViewMode.ViewGenerateJson && this.generateJsonModel) {
      return [
        base,
        game,
        context,
        'generate',
        [
          this.generateJsonModel.fileName,
          this.generateJsonModel.selectedExtensions,
        ].join(','),
      ].join('/');
    }

    if (viewMode === ViewMode.ViewCommand) {
      if (!command) {
        return [
          base,
          game,
          context,
          viewContext === ViewContext.Code ? 'versions' : 'extensions',
          extension,
        ].join('/');
      }
      const url = [
        'https://sannybuilder.com/lib',
        game,
        viewContext === ViewContext.Code ? 'native' : 'script',
        extension,
        command.id || command.name,
      ].join('/');

      return serializeUrlAndParams(
        url,
        getQueryParamsForCommand(command, game)
      );
    }

    return undefined;
  }

  getQueryParamsForCommand(command: Command, game: Game) {
    return getQueryParamsForCommand(command, game);
  }

  treeBack() {
    this._tree.back();
  }

  treeRestart() {
    this._tree.restart();
  }

  updateGenerateJsonModel(model: GenerateJsonModel) {
    this.generateJsonModel = model;
  }

  generateJson() {
    this._ui.generateNewJson(this.generateJsonModel);
    this._ui.stopEditOrDisplay();
  }

  displayFilters() {
    this._ui.displayFilters();
  }

  displayDownloads() {
    this._ui.displayDownloads();
  }

  shouldDisplayRightRail(viewMode: ViewMode) {
    return ![
      ViewMode.None,
      ViewMode.ViewGenerateJson,
      ViewMode.ViewFilters,
      ViewMode.ViewDownloads,
    ].includes(viewMode);
  }

  doesGameRequireOpcode(game: Game) {
    return doesGameRequireOpcode(game);
  }

  doesGameHaveNativeDocs(game: Game) {
    return doesGameHaveNativeDocs(game);
  }

  getDefaultExtension(viewContext: ViewContext) {
    return getDefaultExtension(viewContext);
  }

  onChangeSyntaxKind(syntaxKind: SyntaxKind) {
    this._ui.switchSyntaxKind(syntaxKind);
  }

  dismissHotkeysInfo() {
    this._ui.dismissHotkeysInfo();
  }

  getSourceCodeRepo(command: Command, game: Game, extension: string) {
    if (command.name) {
      if (extension === DEFAULT_EXTENSION) {
        if (GameSourceRepo[game]) {
          return `https://github.com/search?q=repo%3A${GameSourceRepo[game]}+${command.name}&type=code`;
        }
      } else if (SnippetsRepo[game]) {
        return `https://github.com/search?q=repo%3A${SnippetsRepo[game]}+${command.name}&type=code`;
      }
    }
    return '';
  }

  isNewCommand(command: Command | undefined) {
    return !command || !command.name;
  }

  finalizeCommandUpdate() {
    this._ui.stopEditOrDisplay();
    this.updateRelatedCommands = true;
  }

  onDeleteCommand(game: Game) {
    if (!this.isNewCommand(this.oldCommand)) {
      this.deleteCommand(
        this.oldCommand!,
        this.oldExtension!, // ignore possible extension change
        game
      );
    }

    this.finalizeCommandUpdate();
  }

  deleteCommand(command: Command, extension: string, game: Game) {
    this._extensions.deleteCommand({
      command,
      extension,
      game,
    });

    if (this.snippet) {
      this._snippets.deleteSnippet({
        extension,
        command,
      });
    }
  }

  createCommand(command: Command, extension: string) {
    this._extensions.updateCommand({
      command,
      extension,
      shouldDelete: false,
      updateRelated: false,
    });

    if (this.snippet) {
      this._snippets.updateSnippet({
        command,
        extension,
        content: this.snippet,
        updateRelated: false,
      });
    }
  }

  private _onSaveCommand(game: Game) {
    if (this.isNewCommand(this.oldCommand)) {
      this.createCommand(this.command!, this.extension!);
      this.finalizeCommandUpdate();
      return;
    }

    delete this.command?.attrs?._unverified;

    if (
      this.extension !== this.oldExtension ||
      this.command?.name !== this.oldCommand?.name ||
      this.command?.id !== this.oldCommand?.id
    ) {
      this.deleteCommand(this.oldCommand!, this.oldExtension!, game);
      this.createCommand(this.command!, this.extension!);
      this.finalizeCommandUpdate();
      return;
    }

    if (!isEqual(this.command, this.oldCommand)) {
      this._extensions.updateCommand({
        extension: this.extension!,
        command: omit(this.command, SEARCH_OPTIONS.highlightKey) as Command,
        shouldDelete: false,
        updateRelated: this.updateRelatedCommands,
      });
    }

    if (this.snippet !== this.oldSnippet) {
      this._snippets.updateSnippet({
        extension: this.extension!,
        command: this.command!,
        content: this.snippet!,
        updateRelated: this.updateRelatedCommands,
      });
    }

    this.finalizeCommandUpdate();
  }

  private _onSaveEnum() {
    this._enums.updateEnum({
      enumToEdit: this.enumToDisplayOrEdit!,
      oldEnumToEdit: this.oldEnumToEdit!,
    });
    this._ui.stopEditOrDisplay();
  }
}

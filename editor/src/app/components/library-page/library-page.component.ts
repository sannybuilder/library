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
import { takeUntil, map, switchMap, filter, take } from 'rxjs/operators';
import { cloneDeep, isEqual, omit, uniqBy, orderBy, flatten } from 'lodash';

import {
  Command,
  DEFAULT_EXTENSION,
  Enum,
  EnumRaw,
  ViewContext,
  Game,
  GenerateJsonModel,
  ParamType,
  Primitive,
  ViewMode,
} from '../../models';
import {
  ExtensionsFacade,
  SnippetsFacade,
  UiFacade,
  GameFacade,
  EnumsFacade,
  TreeFacade,
  ArticlesFacade,
} from '../../state';
import {
  doesGameRequireOpcode,
  FUSEJS_OPTIONS,
  getBaseGames,
  getQueryParamsForCommand,
  isOtherGame,
  serializeUrlAndParams,
} from '../../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidebar') sidebar: ElementRef<HTMLDivElement>;

  DEFAULT_EXTENSION = DEFAULT_EXTENSION;
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
  displayOpcodePresentation$ = this._ui.displayOpcodePresentation$;
  displayInlineDescription$ = this._ui.displayInlineMethodDescription$;
  extensionToCreateCommands$ = this._ui.selectedExtensions$.pipe(
    map((selectedExtensions) => {
      if (selectedExtensions?.length === 1 && selectedExtensions[0] !== 'any') {
        return selectedExtensions[0];
      }
      return DEFAULT_EXTENSION;
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

  constructor(
    private _extensions: ExtensionsFacade,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _game: GameFacade,
    private _tree: TreeFacade,
    private _enums: EnumsFacade,
    private _router: Router,
    private _ref: ChangeDetectorRef,
    private _el: ElementRef,
    private _articles: ArticlesFacade
  ) {}

  ngOnInit() {
    this._extensions.init();
    this._enums.loadEnumsInfo();
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

  onSave(viewMode: ViewMode) {
    if (viewMode === ViewMode.EditCommand) {
      this._onSaveCommand();
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

  onDeleteCommand(command: Command, game: Game) {
    this._extensions.markCommandsToDelete([command.name], game);
    this._onSaveCommand();
  }

  onCloneCommand(game: Game) {
    this._extensions.cloneCommand({
      game,
      command: this.command!,
      extension: this.extension!,
    });
  }

  onCancel() {
    this._ui.stopEditOrDisplay();
  }

  onToggleOpcodePresentation() {
    this._ui.toggleOpcodePresentation();
    return false;
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

  getFullDescription(command: Command) {
    return this._articles.currentArticle$;
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
      // class & member should be both empty or both filed
      return !!this.command?.class !== !!this.command?.member;
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
    extension,
    command,
    enumName,
    className,
  }: {
    viewMode: ViewMode;
    game: Game;
    extension?: string;
    command?: Command;
    enumName?: string;
    className?: string;
  }) {
    const base = 'https://library.sannybuilder.com/#';
    if (viewMode === ViewMode.ViewAllClasses) {
      return [base, game, 'classes'].join('/');
    }
    if (viewMode === ViewMode.ViewAllEnums) {
      return [base, game, 'enums'].join('/');
    }
    if (viewMode === ViewMode.ViewAllExtensions) {
      return [base, game, 'extensions'].join('/');
    }

    if (viewMode === ViewMode.ViewClass) {
      return [base, game, 'classes', className].join('/');
    }

    if (viewMode === ViewMode.ViewEnum) {
      return [base, game, 'enums', enumName].join('/');
    }

    if (viewMode === ViewMode.ViewGenerateJson && this.generateJsonModel) {
      return [
        base,
        game,
        'generate',
        [
          this.generateJsonModel.fileName,
          this.generateJsonModel.selectedExtensions,
        ].join(','),
      ].join('/');
    }

    if (viewMode === ViewMode.ViewCommand) {
      if (!command) {
        return [base, game, extension].join('/');
      }
      const url = [
        'https://sannybuilder.com/lib',
        game,
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

  shouldDisplayRightRail(viewMode: ViewMode) {
    return ![ViewMode.None, ViewMode.ViewGenerateJson].includes(viewMode);
  }

  doesGameRequireOpcode(game: Game) {
    return doesGameRequireOpcode(game);
  }

  baseHref(game: Game, viewContext: ViewContext) {
    if (viewContext === ViewContext.Code) {
      return `/${game}/functions`;
    }
    return `/${game}`;
  }

  private _onSaveCommand() {
    this._extensions.updateCommand({
      newExtension: this.extension!,
      oldExtension: this.oldExtension!,
      command: omit(this.command, FUSEJS_OPTIONS.fusejsHighlightKey) as Command,
      updateRelated: this.updateRelatedCommands,
    });
    if (this.snippet !== this.oldSnippet) {
      this._snippets.updateSnippet({
        extension: this.extension!,
        command: this.command!,
        content: this.snippet!,
      });
    }

    this._ui.stopEditOrDisplay();
    this.updateRelatedCommands = true;
  }

  private _onSaveEnum() {
    this._enums.updateEnum({
      enumToEdit: this.enumToDisplayOrEdit!,
      oldEnumToEdit: this.oldEnumToEdit!,
    });
    this._ui.stopEditOrDisplay();
  }
}

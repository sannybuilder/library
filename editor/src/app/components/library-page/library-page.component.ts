import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { cloneDeep, isEqual, omit } from 'lodash';

import { CONFIG, Config } from '../../config';
import {
  Command,
  Enum,
  Game,
  ParamType,
  Primitive,
  ViewMode,
} from '../../models';
import {
  AuthFacade,
  ExtensionsFacade,
  SnippetsFacade,
  UiFacade,
  GameFacade,
  EnumsFacade,
} from '../../state';
import { FUSEJS_OPTIONS } from '../../fusejs';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  ViewMode = ViewMode;
  onDestroy$ = new Subject();
  snippet$ = this._ui.snippetToDisplayOrEdit$;
  extensionNames$ = this._extensions.extensionNames$;
  classToDisplay$ = this._ui.classToDisplay$;
  classCommands$ = this._ui.classToDisplayCommands$;
  enumToDisplay$ = this._ui.enumToDisplayOrEdit$;
  game$ = this._game.game$;
  canEdit$ = this._auth.isAuthorized$.pipe(
    map(
      (isAuthorized) =>
        !this._config.features.shouldBeAuthorizedToEdit || isAuthorized
    )
  );
  viewMode$ = this._ui.viewMode$;

  command?: Command;
  oldCommand?: Command;
  snippet?: string;
  oldSnippet?: string;
  extension?: string;
  oldExtension?: string;
  screenSize: number;
  viewMode: ViewMode = ViewMode.None;
  editorHasError = false;

  constructor(
    private _extensions: ExtensionsFacade,
    private _auth: AuthFacade,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _game: GameFacade,
    private _enums: EnumsFacade,
    @Inject(CONFIG) private _config: Config
  ) {}

  ngOnInit() {
    [Game.GTA3, Game.VC, Game.SA].forEach((game) => {
      this._extensions.loadExtensions(game);
      this._snippets.loadSnippets(game);
      this._enums.loadEnums(game);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this._ui.toggleCommandListElements(false);
  }

  ngAfterViewInit(): void {
    this.detectScreenSize();
    this._ui.toggleCommandListElements(true);

    this.snippet$.pipe(takeUntil(this.onDestroy$)).subscribe((snippet) => {
      this.snippet = snippet;
      this.oldSnippet = snippet;
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
      });
  }

  onSave() {
    this._extensions.updateCommand({
      newExtension: this.extension,
      oldExtension: this.oldExtension,
      command: omit(this.command, FUSEJS_OPTIONS.fusejsHighlightKey) as Command,
    });
    if (this.snippet !== this.oldSnippet) {
      this._snippets.updateSnippet({
        extension: this.extension,
        command: this.command,
        content: this.snippet,
      });
    }

    this._ui.stopEditOrDisplay();
  }

  onView(command: Command, extension: string) {
    this._ui.displayCommandInfo(command, extension);
    return false;
  }

  onEdit(command: Command, extension: string) {
    this._ui.editCommandInfo(command, extension);
    return false;
  }

  onCancel() {
    this._ui.stopEditOrDisplay();
  }

  getSnippet(extension: string, opcode: string) {
    return this._snippets.getSnippet(extension, opcode);
  }

  getExtensionEntities(extension: string) {
    return this._extensions.getExtensionEntities(extension);
  }

  getExtensionCommands(extension: string) {
    return this._extensions.getExtensionCommands(extension);
  }

  getExtensionTypes(extension: string): Observable<ParamType[]> {
    return combineLatest([
      this.getExtensionEntities(extension),
      this._game.primitiveTypes$,
      this._enums.enumNames$,
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

  @HostListener('window:resize', [])
  private detectScreenSize() {
    this.screenSize = window.innerWidth;
  }

  shouldDisableSaveButton() {
    return (
      this.editorHasError ||
      this.noChanges() ||
      // class & member should be both empty or both filed
      !!this.command?.class !== !!this.command.member
    );
  }

  resetChanges() {
    this.onEdit(this.oldCommand, this.oldExtension);
    this.snippet = this.oldSnippet;
    return false;
  }

  noChanges(): boolean {
    return (
      isEqual(this.command, this.oldCommand) &&
      this.extension === this.oldExtension &&
      this.snippet === this.oldSnippet
    );
  }

  getCommandSupportInfo(command: Command, extension: string) {
    return this._game.getCommandSupportInfo(command, extension);
  }

  onClassOverview(className: string) {
    this._ui.displayClassOverview(className);
  }
}

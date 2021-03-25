import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { cloneDeep, isEqual, omit } from 'lodash';

import { CONFIG, Config } from '../../config';
import { Command, ViewMode } from '../../models';
import {
  AuthFacade,
  ExtensionsFacade,
  SnippetsFacade,
  UiFacade,
} from '../../state';
import { isAnyAttributeInvalid } from '../../utils/validation';
import { FUSEJS_OPTIONS } from '../../fusejs';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
})
export class LibraryPageComponent implements OnDestroy, AfterViewInit {
  ViewMode = ViewMode;
  onDestroy$ = new Subject();
  command$ = this._ui.commandToDisplayOrEdit$;
  snippet$ = this._ui.snippetToDisplayOrEdit$;
  extensionNames$ = this._extensions.extensionNames$;
  game$ = this._ui.game$;
  canEdit$ = this._auth.isAuthorized$.pipe(
    map(
      (isAuthorized) =>
        !this._config.features.shouldBeAuthorizedToEdit || isAuthorized
    )
  );

  command?: Command;
  oldCommand?: Command;
  snippet?: string;
  oldSnippet?: string;
  extension?: string;
  oldExtension?: string;
  screenSize: number;
  viewMode: ViewMode = ViewMode.None;

  constructor(
    private _extensions: ExtensionsFacade,
    private _auth: AuthFacade,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    @Inject(CONFIG) private _config: Config
  ) {}

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

    this.command$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({ command, extension, viewMode }) => {
        this.command = command ? cloneDeep(command) : command;
        this.oldCommand = command ? cloneDeep(command) : command;
        this.oldExtension = extension;
        this.extension = extension;
        this.viewMode = viewMode;
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
        opcode: this.command.id,
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

  @HostListener('window:resize', [])
  private detectScreenSize() {
    this.screenSize = window.innerWidth;
  }

  shouldDisableSaveButton() {
    return isAnyAttributeInvalid(this.command) || this.noChanges();
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
    return this._ui.getCommandSupportInfo(command, extension);
  }
}

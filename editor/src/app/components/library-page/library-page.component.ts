import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { omit } from 'lodash';
import { Modal } from 'bootstrap';

import { CONFIG, Config } from '../../config';
import { Command, SEARCH_OPTIONS, ViewMode } from '../../models';
import {
  AuthFacade,
  ExtensionsFacade,
  SnippetsFacade,
  UiFacade,
} from '../../state';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
})
export class LibraryPageComponent implements OnDestroy {
  ViewMode = ViewMode;
  onDestroy$ = new Subject();
  command$ = this._ui.commandToDisplayOrEdit$;
  snippet$ = this._ui.snippetToDisplayOrEdit$;
  game$ = this._ui.game$;
  canEdit$ = this._auth.isAuthorized$.pipe(
    map(
      (isAuthorized) =>
        !this._config.features.shouldBeAuthorizedToEdit || isAuthorized
    )
  );

  command?: Command;
  snippet?: string;
  oldSnippet?: string;
  extension?: string;
  oldExtension?: string;
  screenSize: number;
  viewMode: ViewMode = ViewMode.None;

  private _handle: Modal;

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
    this._handle.dispose();
    this._ui.toggleCommandListElements(false);
  }

  ngAfterViewInit(): void {
    this._handle = new Modal(document.getElementById('modal'), {
      backdrop: 'static',
      keyboard: true,
    });

    this._ui.toggleCommandListElements(true);

    this.snippet$.pipe(takeUntil(this.onDestroy$)).subscribe((snippet) => {
      this.snippet = snippet;
      this.oldSnippet = snippet;
    });

    this.command$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(({ command, extension, viewMode }) => {
        this.command = command ? JSON.parse(JSON.stringify(command)) : command;

        // display editor in modal
        this.detectScreenSize();
        if (this.screenSize < 1200) {
          if (this.command) {
            this._handle.show();
          } else {
            this._handle.hide();
          }
        }
        this.oldExtension = extension;
        this.extension = extension;
        this.viewMode = viewMode;
      });
  }

  onSave() {
    this._extensions.updateCommand({
      newExtension: this.extension,
      oldExtension: this.oldExtension,
      command: omit(this.command, SEARCH_OPTIONS.fusejsHighlightKey) as Command,
    });
    if (this.snippet !== this.oldSnippet) {
      this._snippets.updateSnippet({
        extension: this.extension,
        opcode: this.command.id,
        content: this.snippet,
      });
    }

    this._handle.hide();
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
    this._handle.hide();
  }

  getSnippet(extension: string, opcode: string) {
    return this._snippets.getSnippet(extension, opcode);
  }

  getExtensionEntities(extension: string) {
    return this._extensions.getExtensionEntities(extension);
  }

  // todo: switch edit modal/rail on resise
  // @HostListener('window:resize', [])
  // private onResize() {
  //   this.detectScreenSize();
  // }

  private detectScreenSize() {
    this.screenSize = window.innerWidth;
  }
}

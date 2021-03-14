import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { omit } from 'lodash';
import { Modal } from 'bootstrap';

import { CONFIG, Config } from '../../config';
import { AuthFacade } from '../../state/auth/auth.facade';
import { Command, SEARCH_OPTIONS, ViewMode } from '../../models';
import { ExtensionsFacade } from '../../state/extensions/facade';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
})
export class LibraryPageComponent implements OnDestroy {
  ViewMode = ViewMode;
  onDestroy$ = new Subject();
  command$ = this._facade.commandToDisplayOrEdit$;
  game$ = this._facade.game$;
  canEdit$ = this._authFacade.isAuthorized$.pipe(
    map(
      (isAuthorized) =>
        !this._config.features.shouldBeAuthorizedToEdit || isAuthorized
    )
  );

  command?: Command;
  extension?: string;
  oldExtension?: string;
  screenSize: number;
  viewMode: ViewMode = ViewMode.None;

  private _handle: Modal;

  constructor(
    private _facade: ExtensionsFacade,
    private _authFacade: AuthFacade,
    @Inject(CONFIG) private _config: Config
  ) {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this._handle.dispose();
    this._facade.toggleCommandListElements(false);
  }

  ngAfterViewInit(): void {
    this._handle = new Modal(document.getElementById('modal'), {
      backdrop: 'static',
      keyboard: true,
    });

    this._facade.toggleCommandListElements(true);

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
    this._facade.updateCommand({
      newExtension: this.extension,
      oldExtension: this.oldExtension,
      command: omit(this.command, SEARCH_OPTIONS.fusejsHighlightKey) as Command,
    });
    this._handle.hide();
  }

  onView(command: Command, extension: string) {
    this._facade.displayCommandInfo(command, extension);
    return false;
  }

  onEdit(command: Command, extension: string) {
    this._facade.editCommandInfo(command, extension);
    return false;
  }

  onCancel() {
    this._facade.stopEditOrDisplay();
    this._handle.hide();
  }

  getExtensionEntities(extension: string) {
    return this._facade.getExtensionEntities(extension);
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

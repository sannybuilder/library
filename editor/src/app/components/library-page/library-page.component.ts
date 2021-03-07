import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { omit } from 'lodash';
import { Modal } from 'bootstrap';

import { Command, Game, SEARCH_OPTIONS, ViewMode } from '../../models';
import { StateFacade } from '../../state/facade';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
})
export class LibraryPageComponent implements OnInit, OnDestroy {
  ViewMode = ViewMode;
  onDestroy$ = new Subject();
  command$ = this._facade.commandToDisplayOrEdit$;

  command?: Command;
  extension?: string;
  oldExtension?: string;
  title: string;
  game: Game;
  screenSize: number;
  viewMode: ViewMode = ViewMode.None;

  private _handle: Modal;

  constructor(
    private _facade: StateFacade,
    private _router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._router.events
      .pipe(
        filter((x) => x instanceof NavigationEnd),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        this.onRouteChange();
      });

    this.onRouteChange();
    this._facade.toggleCommandListElements(true);

    this.command$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(({ command, extension, viewMode }) => {
          this.command = command
            ? JSON.parse(JSON.stringify(command))
            : command;

          // display editor in modal
          if (this.screenSize < 1200) {
            this._handle.show();
          }
          this.oldExtension = extension;
          this.extension = extension;
          this.viewMode = viewMode;
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this._handle.dispose();
  }

  ngAfterViewInit(): void {
    this._handle = new Modal(document.getElementById('modal'), {
      backdrop: 'static',
      keyboard: true,
    });
    this.detectScreenSize();
  }

  onRouteChange() {
    const { data } = this.route.snapshot.data;
    this.title = data.title;
    if (data.game !== this.game) {
      this.game = data.game;
      this._facade.loadExtensions(this.game);
    }
  }

  onSave() {
    this._facade.updateCommand({
      newExtension: this.extension,
      oldExtension: this.oldExtension,
      command: omit(this.command, SEARCH_OPTIONS.fusejsHighlightKey),
      game: this.game,
    });
  }

  onCancel() {
    this._facade.stopEditOrDisplay();
    this._handle.hide();
  }

  getExtensionEntities(extension: string) {
    return this._facade.getExtensionEntities(extension);
  }

  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    this.screenSize = window.innerWidth;
  }
}

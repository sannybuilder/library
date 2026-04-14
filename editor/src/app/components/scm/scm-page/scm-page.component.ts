import {
  AfterViewInit,
  Component,
  Inject,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ExtensionsFacade } from '../../../state/extensions/facade';
import { GameFacade } from '../../../state/game/facade';
import { ScmFacade } from '../../../state/scm/facade';
import { UiFacade } from '../../../state/ui/facade';
import { DEFAULT_EXTENSION, ViewContext, ViewMode } from '../../../models';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ContextEditSessionService } from '../../layout/context-edit-session.service';
import {
  isCodeViewContext,
  isScriptViewContext,
  shouldDisplayRightRail,
} from '../../../utils';

@Component({
  selector: 'scl-scm-page',
  templateUrl: './scm-page.component.html',
  styleUrls: ['./scm-page.component.scss'],
  standalone: false,
  providers: [ContextEditSessionService],
})
export class ScmPageComponent implements OnInit, AfterViewInit, OnDestroy {
  game$ = this._game.game$;
  isSidebarCollapsed$ = this._ui.isSidebarCollapsed$;
  onDestroy$ = new Subject<void>();
  viewMode$ = this._ui.viewMode$;
  ViewMode = ViewMode;
  ViewContext = ViewContext;
  readonly isCodeViewContext = isCodeViewContext;
  readonly isScriptViewContext = isScriptViewContext;
  activeFile$ = this._scm.activeFileName$;
  code$ = this._scm.currentFile$;
  map$ = this._scm.map$;
  tree$ = this._scm.tree$;
  xrefs$ = this._scm.xrefs$;
  refs$ = this._scm.refs$;
  overlay$ = this._scm.overlay$;
  viewContext$ = this._game.viewContext$;
  screenSize: number = window.innerWidth;
  canEdit$ = this._ui.canEdit$;
  isFullScreenMode = false;
  activeFragment?: string | null;

  // display options
  showLineNumbers = true;
  showOffsets = false;

  constructor(
    private _extensions: ExtensionsFacade,
    private _game: GameFacade,
    private _scm: ScmFacade,
    private _ui: UiFacade,
    private _route: ActivatedRoute,
    @Inject(DOCUMENT) private _document: Document,
  ) {}

  ngOnInit() {
    this._extensions.init();

    combineLatest([this._route.fragment, this.code$])
      .pipe(
        takeUntil(this.onDestroy$),
        filter(([fragment, code]) => !!fragment && !!code),
      )
      .subscribe(([fragment]) => {
        this.activeFragment = fragment;

        // File content is loaded asynchronously, so defer scrolling until the DOM is updated.
        requestAnimationFrame(() => {
          const target = this._document.getElementById(fragment!);
          target?.focus();

          if (fragment?.startsWith('label-')) {
            // update xrefs
            const offsetStr = fragment.substring('label-'.length);
            const offset = Number.parseInt(offsetStr, 10);
            if (!Number.isNaN(offset)) {
              this._scm.selectLabelOffset(offset);
            }
          }
        });
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(undefined);
    this.onDestroy$.complete();
    this._ui.toggleCommandListElements(false);
  }

  ngAfterViewInit(): void {
    this.detectScreenSize();
    this._ui.toggleCommandListElements(true);
  }

  onCancel() {
    this._ui.stopEditOrDisplay();
  }

  shouldDisplayRightRail(viewMode: ViewMode) {
    return shouldDisplayRightRail(viewMode);
  }

  @HostListener('window:resize', [])
  detectScreenSize() {
    this.screenSize = window.innerWidth;
  }

  toggleSidebar() {
    this._ui.toggleSidebar();
  }

  getCommands() {
    return this._extensions.getExtensionCommands(DEFAULT_EXTENSION);
  }

  displayDownloads() {
    this._ui.displayDownloads();
  }
}

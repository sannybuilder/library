import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
  ElementRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ExtensionsFacade } from '../../../state/extensions/facade';
import { GameFacade } from '../../../state/game/facade';
import { ScmFacade } from '../../../state/scm/facade';
import { UiFacade } from '../../../state/ui/facade';
import {
  DEFAULT_EXTENSION,
  Game,
  ViewContext,
  ViewMode,
} from '../../../models';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ContextEditSessionService } from '../../layout/context-edit-session.service';
import {
  isCodeViewContext,
  isScriptViewContext,
  shouldDisplayRightRail,
} from '../../../utils';
import { install, uninstall } from '@github/hotkey';

@Component({
  selector: 'scl-scm-page',
  templateUrl: './scm-page.component.html',
  styleUrls: ['./scm-page.component.scss'],
  standalone: false,
  providers: [ContextEditSessionService],
})
export class ScmPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private _extensions = inject(ExtensionsFacade);
  private _game = inject(GameFacade);
  private _scm = inject(ScmFacade);
  private _ui = inject(UiFacade);
  private _route = inject(ActivatedRoute);
  private _document = inject(DOCUMENT);
  private _element = inject(ElementRef);

  ViewMode = ViewMode;
  ViewContext = ViewContext;
  Game = Game;

  game$ = this._game.game$;
  isSidebarCollapsed$ = this._ui.isSidebarCollapsed$;
  onDestroy$ = new Subject<void>();
  viewMode$ = this._ui.viewMode$;
  readonly isCodeViewContext = isCodeViewContext;
  readonly isScriptViewContext = isScriptViewContext;
  activeFile$ = this._scm.activeFileName$;
  code$ = this._scm.currentFile$;
  map$ = this._scm.map$;
  tree$ = this._scm.tree$;
  xrefs$ = this._scm.xrefs$;
  refs$ = this._scm.refs$;
  
  refsOverlay$ = this._scm.refsOverlay$;
  variablesOverlay$ = this._scm.variablesOverlay$;

  viewContext$ = this._game.viewContext$;
  screenSize: number = window.innerWidth;
  canEdit$ = this._ui.canEdit$;
  isFullScreenMode = false;
  activeFragment?: string | null;

  // display options
  showLineNumbers$ = this._ui.scmViewShowLineNumbers$;
  showOffsets$ = this._ui.scmViewShowOffsets$;
  adjustOffsets$ = this._ui.scmViewAdjustOffsets$;

  ngOnInit() {
    this._extensions.init();
    setTimeout(() => {
      const elems =
        this._element.nativeElement.querySelectorAll('[data-hotkey]');
      for (const el of elems) {
        install(el);
      }
    });
    combineLatest([this._route.fragment, this.code$])
      .pipe(
        takeUntil(this.onDestroy$),
        filter(([fragment, code]) => !!code),
      )
      .subscribe(([fragment]) => {
        this.activeFragment = fragment;

        // File content is loaded asynchronously, so defer scrolling until the DOM is updated.
        requestAnimationFrame(() => {
          // TODO: proper scroll position restoration on back navigation
          if (!fragment) {
            const container = this._document.getElementById('code-container');
            if (container) {
              container.scrollTop = 0;
            }
            return;
          }
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

    const elems = this._element.nativeElement.querySelectorAll('[data-hotkey]');
    for (const el of elems) {
      uninstall(el);
    }
  }

  ngAfterViewInit(): void {
    this.detectScreenSize();
    this._ui.toggleCommandListElements(false);
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

  toggleShowLineNumbers(showLineNumbers: boolean) {
    this._ui.changeScmViewShowLineNumbers(showLineNumbers);
  }

  toggleShowOffsets(showOffsets: boolean) {
    this._ui.changeScmViewShowOffsets(showOffsets);
  }

  toggleAdjustOffsets(adjustOffsets: boolean) {
    this._ui.changeScmViewAdjustOffsets(adjustOffsets);
  }
}

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
import { ActivatedRoute, Router } from '@angular/router';
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
  getRoutePath,
  shouldDisplayRightRail,
} from '../../../utils';
import { KeyValueEntry, ScmTreeNode } from '../model';
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
  private _router = inject(Router);
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
  commentsOverlay$ = this._scm.commentsOverlay$;
  variablesOverlay$ = this._scm.variablesOverlay$;

  viewContext$ = this._game.viewContext$;
  screenSize: number = window.innerWidth;
  canEdit$ = this._ui.canEdit$;
  isFullScreenMode = false;
  activeFragment?: string | null;

  canGoPrev = false;
  canGoNext = false;

  private orderedFilePaths: string[] = [];
  private currentActiveFile?: string;
  private currentGame?: Game;
  private touchStartX?: number;
  private touchStartY?: number;

  // display options
  showLineNumbers$ = this._ui.scmViewShowLineNumbers$;
  showOffsets$ = this._ui.scmViewShowOffsets$;
  adjustOffsets$ = this._ui.scmViewAdjustOffsets$;
  showComments$ = this._ui.scmViewShowComments$;

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

    combineLatest([this.tree$, this.activeFile$, this.game$])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([tree, activeFile, game]) => {
        this.orderedFilePaths = this.flattenTreePaths(tree ?? []);
        this.currentActiveFile = activeFile ?? undefined;
        this.currentGame = game;
        this.updateQuickNavState();
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

  toggleShowComments(showComments: boolean) {
    this._ui.changeScmViewShowComments(showComments);
  }

  onCommentsOverlayChange(comments: KeyValueEntry[]) {
    this._scm.updateComments(comments);
  }

  goToPrevFile() {
    this.navigateRelativeFile(-1);
  }

  goToNextFile() {
    this.navigateRelativeFile(1);
  }

  onCodeTouchStart(event: TouchEvent) {
    if (this.screenSize >= 1200) {
      return;
    }

    const touch = event.changedTouches[0];
    if (!touch) {
      return;
    }

    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  onCodeTouchEnd(event: TouchEvent) {
    if (this.screenSize >= 1200) {
      return;
    }

    const touch = event.changedTouches[0];
    if (
      !touch ||
      this.touchStartX === undefined ||
      this.touchStartY === undefined
    ) {
      this.resetTouchStart();
      return;
    }

    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;
    this.resetTouchStart();

    const minSwipeDistance = 60;
    if (
      Math.abs(deltaX) < minSwipeDistance ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    if (deltaX < 0) {
      this.goToNextFile();
      return;
    }

    this.goToPrevFile();
  }

  private navigateRelativeFile(step: number) {
    if (!this.currentGame || !this.currentActiveFile || !this.orderedFilePaths.length) {
      return;
    }

    const currentIndex = this.orderedFilePaths.indexOf(this.currentActiveFile);
    if (currentIndex === -1) {
      return;
    }

    const targetIndex = currentIndex + step;
    if (targetIndex < 0 || targetIndex >= this.orderedFilePaths.length) {
      return;
    }

    const targetPath = this.orderedFilePaths[targetIndex];
    this._router.navigate(getRoutePath(this.currentGame, targetPath));
  }

  private flattenTreePaths(nodes: ScmTreeNode[]): string[] {
    const paths: string[] = [];

    for (const node of nodes) {
      if (node.path) {
        paths.push(node.path);
      }

      if (node.children?.length) {
        paths.push(...this.flattenTreePaths(node.children));
      }
    }

    return paths;
  }

  private updateQuickNavState() {
    if (!this.currentActiveFile || !this.orderedFilePaths.length) {
      this.canGoPrev = false;
      this.canGoNext = false;
      return;
    }

    const currentIndex = this.orderedFilePaths.indexOf(this.currentActiveFile);
    this.canGoPrev = currentIndex > 0;
    this.canGoNext =
      currentIndex !== -1 && currentIndex < this.orderedFilePaths.length - 1;
  }

  private resetTouchStart() {
    this.touchStartX = undefined;
    this.touchStartY = undefined;
  }
}

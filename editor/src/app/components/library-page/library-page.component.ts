import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, withLatestFrom } from 'rxjs/operators';

import {
  ViewContext,
  Game,
  JsonModel,
  ViewMode,
} from '../../models';
import {
  ExtensionsFacade,
  SnippetsFacade,
  UiFacade,
  GameFacade,
  EnumsFacade,
  ChangesFacade,
} from '../../state';
import {
  getBaseGames,
  getDefaultExtension,
  isCodeViewContext,
  isOtherGame,
  isScriptViewContext,
  shouldDisplayRightRail,
} from '../../utils';
import { ContextEditSessionService } from '../layout/context-edit-session.service';

@Component({
  selector: 'scl-library-page',
  templateUrl: './library-page.component.html',
  styleUrls: ['./library-page.component.scss'],
  standalone: false,
  providers: [ContextEditSessionService],
})
export class LibraryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;

  ViewMode = ViewMode;
  ViewContext = ViewContext;
  readonly isCodeViewContext = isCodeViewContext;
  readonly isScriptViewContext = isScriptViewContext;
  onDestroy$ = new Subject();

  extensionNames$ = this._extensions.extensionNames$;
  game$ = this._game.game$;
  viewContext$ = this._game.viewContext$;
  canEdit$ = this._ui.canEdit$;
  viewMode$ = this._ui.viewMode$;
  extensions$ = this._extensions.extensions$;
  isHotkeyInfoDismissed$ = this._ui.isHotkeyInfoDismissed$;
  selectedSyntaxKind$ = this._ui.selectedSyntaxKind$;
  extensionToCreateCommands$ = this._ui.selectedExtensions$.pipe(
    withLatestFrom(this._game.viewContext$),
    map(([selectedExtensions, viewContext]) => {
      if (selectedExtensions?.length === 1 && selectedExtensions[0] !== 'any') {
        return selectedExtensions[0];
      }
      return getDefaultExtension(viewContext);
    }),
  );

  displaySearchHelp$ = this._ui.displaySearchHelp$;
  isSidebarCollapsed$ = this._ui.isSidebarCollapsed$;
  isCustomFilterSelected$ = this._ui.isCustomFilterSelected$;

  screenSize: number = window.innerWidth;
  isFullScreenMode = false;

  constructor(
    private _extensions: ExtensionsFacade,
    private _ui: UiFacade,
    private _snippets: SnippetsFacade,
    private _game: GameFacade,
    private _enums: EnumsFacade,
    private _el: ElementRef,
    private _changes: ChangesFacade,
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

    this.displaySearchHelp$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((shouldDisplay) => {
        (this._el.nativeElement as HTMLElement).classList.toggle(
          'd-none',
          shouldDisplay,
        );
      });
  }

  onCancel() {
    this._ui.stopEditOrDisplay();
  }

  getGameExtensions(game: Game) {
    return this._extensions.getGameExtensions(game);
  }

  @HostListener('window:resize', [])
  private detectScreenSize() {
    this.screenSize = window.innerWidth;
  }

  toggleSidebar() {
    this._ui.toggleSidebar();
  }

  updateJsonModel(model: JsonModel) {
    this._ui.updateJsonModel(model);
  }

  displayFilters() {
    this._ui.displayFilters();
  }

  displayDownloads() {
    this._ui.displayDownloads();
  }

  shouldDisplayRightRail(viewMode: ViewMode) {
    return shouldDisplayRightRail(viewMode);
  }

  dismissHotkeysInfo() {
    this._ui.dismissHotkeysInfo();
  }
}

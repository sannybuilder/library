import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  getDefaultExtension,
  getDefaultSyntaxKind,
  getQueryParamsForCommand,
  isSupported,
} from '../../../utils';
import {
  Command,
  Extension,
  ViewContext,
  Game,
  SyntaxKind,
} from '../../../models';
import { ExtensionsFacade, SnippetsFacade, UiFacade } from '../../../state';

@Component({
    selector: 'scl-command-list',
    templateUrl: './command-list.component.html',
    styleUrls: ['./command-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CommandListComponent {
  ViewContext = ViewContext;

  @Input() gameExtensions: Extension[];
  @Input() game: Game;
  @Input() canEdit: boolean;
  @Input() narrowed: boolean;
  @Input() viewContext: ViewContext;
  @Input() syntaxKind: SyntaxKind;

  loading$ = this._extensions.loading$;
  loadingError$ = this._extensions.loadingError$;
  currentPage$ = this._ui.currentPage$;
  appliedFilters$ = this._ui.appliedFilters$;
  rows$ = this._ui.rows$;
  rowsCount$ = this.rows$.pipe(map((rows) => rows.length));

  constructor(
    private _extensions: ExtensionsFacade,
    private _snippets: SnippetsFacade,
    private _ui: UiFacade,
    private _elementRef: ElementRef,
    private _router: Router
  ) {}

  getSnippet(extension: string, id: string) {
    return this._snippets.getSnippet(extension, id);
  }

  getCommandSupportInfo(command: Command, extension: string) {
    return this._extensions.getCommandSupportInfo(command, extension);
  }

  goToPage(index: number) {
    this._ui.changePage(index);
    this._ui.scrollTop();
  }

  resetFilters() {
    this._ui.resetFilters();
    return false;
  }

  getQueryParamsForCommand(command: Command, game: Game) {
    return getQueryParamsForCommand(command, game);
  }

  isSupported(command: Command) {
    return isSupported(command.attrs);
  }

  get baseHref() {
    if (this.viewContext === ViewContext.Code) {
      return `/${this.game}/native/versions`;
    }
    return `/${this.game}/script/extensions`;
  }

  getDefaultExtension() {
    return getDefaultExtension(this.viewContext);
  }

  get defaultSyntaxKind(): SyntaxKind {
    return getDefaultSyntaxKind(this.game, this.syntaxKind);
  }

  navigateToCommand(row: { extension: string; command: Command }) {
    this._router.navigate(
      [this.baseHref, row.extension, row.command.id || row.command.name],
      {
        queryParams: getQueryParamsForCommand(row.command, this.game),
      }
    );
  }

  // Focus on the next/previous card when the tilde key is pressed
  @HostListener('window:keydown', ['$event'])
  onTildePress(event: KeyboardEvent) {
    if (document.body.classList.contains('modal-open')) {
      return;
    }
    if (event.key === '`' || event.key === '~') {
      const cards = this._elementRef.nativeElement.querySelectorAll('.card');
      if (!cards.length) {
        return;
      }
      let index = Array.from(cards).indexOf(
        document.activeElement as HTMLElement
      );

      if (event.key === '~') {
        index--;
      } else {
        index++;
      }
      if (index < 0) {
        index = cards.length - 1;
      } else if (index >= cards.length) {
        index = 0;
      }

      cards[index].focus();
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }
}

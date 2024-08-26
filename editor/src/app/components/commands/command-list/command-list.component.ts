import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  getDefaultExtension,
  getDefaultSyntaxKind,
  getQueryParamsForCommand,
  isSupported,
} from '../../../utils';
import { Command, Extension, ViewContext, Game, SyntaxKind } from '../../../models';
import { ExtensionsFacade, SnippetsFacade, UiFacade } from '../../../state';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  rows$ = this._ui.rows$;
  rowsCount$ = this.rows$.pipe(map((rows) => rows.length));

  constructor(
    private _extensions: ExtensionsFacade,
    private _snippets: SnippetsFacade,
    private _ui: UiFacade
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
}

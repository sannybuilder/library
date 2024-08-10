import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { doesGameRequireOpcode, getQueryParamsForCommand, isSupported } from '../../../utils';
import { Command, DEFAULT_EXTENSION, Extension, ViewContext, Game } from '../../../models';
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

  loading$ = this._extensions.loading$;
  loadingError$ = this._extensions.loadingError$;
  currentPage$ = this._ui.currentPage$;
  rows$ = this._ui.rows$;
  rowsCount$ = this.rows$.pipe(map((rows) => rows.length));

  DEFAULT_EXTENSION = DEFAULT_EXTENSION;

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

  get doesGameRequireOpcode() {
    return doesGameRequireOpcode(this.game);
  }

  isSupported(command: Command) {
    return isSupported(command.attrs)
  }

  get baseHref() {
    if (this.viewContext === ViewContext.Code) {
      return `/${this.game}/native/versions`
    }
    return `/${this.game}/script/extensions`;
  }
}

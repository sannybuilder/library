import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { map } from 'rxjs/operators';
import { getQueryParamsForCommand } from '../../../utils';
import { Command, Game } from '../../../models';
import { ExtensionsFacade, SnippetsFacade, UiFacade } from '../../../state';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandListComponent {
  @Input() game: Game;
  @Input() canEdit: boolean;
  @Input() narrowed: boolean;
  @Output() descriptionClick = new EventEmitter();

  loading$ = this._extensions.loading$;
  currentPage$ = this._ui.currentPage$;
  rows$ = this._ui.rows$;
  rowsCount$ = this.rows$.pipe(map((rows) => rows?.length ?? 0));

  constructor(
    private _extensions: ExtensionsFacade,
    private _snippets: SnippetsFacade,
    private _ui: UiFacade
  ) {}

  getSnippet(extension: string, opcode: string) {
    return this._snippets.getSnippet(extension, opcode);
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

  interceptDescriptionClick(event: MouseEvent) {
    this.descriptionClick.next(event);
    return false;
  }

  getQueryParamsForCommand(command: Command, game: Game) {
    return getQueryParamsForCommand(command, game);
  }
}

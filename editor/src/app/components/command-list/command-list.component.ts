import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { GameFacade } from 'src/app/state/game/facade';
import { Command, Game } from '../../models';
import { ExtensionsFacade, SnippetsFacade, UiFacade } from '../../state';

@Component({
  selector: 'scl-command-list',
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent {
  @Input() game: Game;
  @Input() canEdit: boolean;
  @Input() narrowed: boolean;
  @Output() view: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();
  @Output() edit: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();

  loading$ = this._extensions.loading$;
  currentPage$ = this._ui.currentPage$;
  rows$ = this._ui.rows$;
  rowsCount$ = this.rows$.pipe(map((rows) => rows.length));

  constructor(
    private _extensions: ExtensionsFacade,
    private _snippets: SnippetsFacade,
    private _ui: UiFacade,
    private _game: GameFacade
  ) {}

  onEdit(command: Command, extension: string) {
    this.edit.emit({ command, extension });
    return false;
  }

  onView(command: Command, extension: string) {
    this.view.emit({ command, extension });
    return false;
  }

  getSnippet(extension: string, opcode: string) {
    return this._snippets.getSnippet(extension, opcode);
  }

  getCommandSupportInfo(command: Command, extension: string) {
    return this._game.getCommandSupportInfo(command, extension);
  }

  goToPage(index: number) {
    this._ui.changePage(index);
    this._ui.scrollTop();
  }

  resetFilters() {
    this._ui.resetFilters();
    return false;
  }
}

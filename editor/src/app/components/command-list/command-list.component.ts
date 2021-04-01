import { Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, of, timer, zip } from 'rxjs';
import { debounce, filter, map, switchMap, tap } from 'rxjs/operators';
import { flatMap } from 'lodash';
import { Attribute, Command, Game } from '../../models';
import { ExtensionsFacade, SnippetsFacade, UiFacade } from '../../state';
import { search } from '../../fusejs/fusejs';

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
  selectedFiltersOnly$ = this._ui.selectedFiltersOnly$;
  selectedFiltersExcept$ = this._ui.selectedFiltersExcept$;
  searchTerm$ = this._ui.searchTerm$.pipe(debounce(() => timer(500)));
  currentPage$ = this._ui.currentPage$;

  rows$ = combineLatest([
    this._extensions.extensions$.pipe(
      filter((extensions) => !!extensions),
      switchMap((extensions) =>
        zip(...extensions.map((e) => this.isExtensionChecked(e.name))).pipe(
          switchMap((state) => of(extensions.filter((_, i) => state[i])))
        )
      )
    ),
    this.selectedFiltersOnly$,
    this.selectedFiltersExcept$,
    this.searchTerm$,
  ]).pipe(
    switchMap(
      ([
        extensions,
        selectedFiltersOnly,
        selectedFiltersExcept,
        searchTerm,
      ]) => {
        return of(
          flatMap(extensions, ({ name: extension, commands }) => {
            const filtered = this.filterCommands(
              commands,
              selectedFiltersOnly,
              selectedFiltersExcept
            );
            return search(filtered, searchTerm).map((command) => ({
              extension,
              command,
            }));
          })
        );
      }
    )
  );

  rowsCount$ = this.rows$.pipe(map((rows) => rows.length));

  constructor(
    private _extensions: ExtensionsFacade,
    private _snippets: SnippetsFacade,
    private _ui: UiFacade
  ) {}

  isExtensionChecked(extension: string) {
    return this._extensions.getExtensionCheckedState(extension);
  }

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
    return this._ui.getCommandSupportInfo(command, extension);
  }

  pageChange(index: number) {
    this._ui.changePage(index);
  }

  private filterCommands(
    elements: Command[],
    only: Attribute[],
    except: Attribute[]
  ) {
    return elements.filter(
      (element) =>
        only.every((attr) => element.attrs?.[attr]) &&
        !except.some((attr) => element.attrs?.[attr])
    );
  }
}

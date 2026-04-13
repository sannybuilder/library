import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cloneDeep, flatten, orderBy, uniqBy } from 'lodash';
import { combineLatest, Observable, of, zip } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import {
  Command,
  Enum,
  EnumRaw,
  Game,
  ParamType,
  Primitive,
  SyntaxKind,
  ViewContext,
  ViewMode,
} from '../../../models';
import {
  ArticlesFacade,
  EnumsFacade,
  ExtensionsFacade,
  GameFacade,
  SnippetsFacade,
  UiFacade,
} from '../../..//state';
import { getDefaultExtension } from '../../../utils/extension';
import { ContextEditSessionService } from '../context-edit-session.service';

@Component({
  selector: 'scl-context-view',
  templateUrl: './context-view.component.html',
  styleUrls: ['./context-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ContextViewComponent {
  ViewMode = ViewMode;
  ViewContext = ViewContext;

  viewContext$ = this._game.viewContext$;
  game$ = this._game.game$;
  viewMode$ = this._ui.viewMode$;
  enumNames$ = this._enums.enumNames$;
  extensions$ = this._extensions.extensions$;
  extensionTypes$ = this._extensions.extensionTypes$;
  classToDisplay$ = this._ui.classToDisplay$;
  displayInlineDescription$ = this._ui.displayInlineMethodDescription$;
  canEdit$ = this._ui.canEdit$;
  selectedSyntaxKind$ = this._ui.selectedSyntaxKind$;
  classCommands$ = this._ui.classToDisplayCommands$;

  get command() {
    return this._session.command;
  }

  set command(value: Command | undefined) {
    this._session.command = value;
  }

  get extension() {
    return this._session.extension;
  }

  set extension(value: string | undefined) {
    this._session.extension = value;
  }

  get snippet() {
    return this._session.snippet;
  }

  set snippet(value: string | undefined) {
    this._session.snippet = value;
  }

  get enumToDisplayOrEdit() {
    return this._session.enumToDisplayOrEdit;
  }

  set enumToDisplayOrEdit(value: EnumRaw | undefined) {
    this._session.enumToDisplayOrEdit = value;
  }

  get oldEnumToEdit() {
    return this._session.oldEnumToEdit;
  }

  entities$: Observable<Array<{ origin: string; name: string }>> =
    this._extensions.extensionNames$.pipe(
      switchMap((extensions) =>
        this.getExtensionsEntities(extensions).pipe(
          switchMap((entities) =>
            zip(
              ...entities.map((e) =>
                this.getClassOrigin(e.name).pipe(
                  map((origin) => ({ origin, name: e.name })),
                ),
              ),
            ),
          ),
        ),
      ),
      map((entities) => orderBy(entities, 'name')),
    );

  classAndEnumNames$ = combineLatest([this.entities$, this.enumNames$]).pipe(
    map(([entities, enums]) => ({
      enums,
      entities: entities.map((e) => e.name),
    })),
  );

  constructor(
    private _game: GameFacade,
    private _ui: UiFacade,
    private _extensions: ExtensionsFacade,
    private _enums: EnumsFacade,
    private _snippets: SnippetsFacade,
    private _articles: ArticlesFacade,
    private _session: ContextEditSessionService,
  ) {}

  getSnippet(extension: string, id: string) {
    return this._snippets.getSnippet(extension, id);
  }

  getClassOrigin(className: string) {
    return this._extensions.getClassOrigin(className);
  }

  getCommandSupportInfo(command: Command, extension: string) {
    return this._extensions.getCommandSupportInfo(command, extension);
  }

  getDefaultExtension(viewContext: ViewContext) {
    return getDefaultExtension(viewContext);
  }

  getExtensionTypes(...extensions: string[]): Observable<ParamType[]> {
    return combineLatest([
      this.getExtensionsEntities(extensions),
      this._game.primitiveTypes$,
      this.enumNames$,
    ]).pipe(
      map(([entities, primitiveTypes, enumNames]) => {
        const primitives: Primitive[] = primitiveTypes.map((name) => ({
          type: 'primitive',
          name,
        }));

        const enums: Enum[] = enumNames.map((name) => ({ name, type: 'enum' }));

        return [...entities, ...primitives, ...enums];
      }),
    );
  }

  getExtensionsEntities(extensions: string[]) {
    return (
      extensions?.length
        ? zip(
            ...extensions.map((e) => this._extensions.getExtensionEntities(e)),
          )
        : of([])
    ).pipe(
      map((entities) =>
        uniqBy(orderBy(flatten(entities), ['type', 'name']), 'name'),
      ),
    );
  }

  getGamesWhereEnumExists(enumName: string) {
    return this._enums.getGamesWhereEnumExists(enumName);
  }

  findRelatedCommands(command: Command, extension: string, game: Game) {
    return this._extensions.findRelatedCommands(command, extension, game);
  }

  getClassMeta(game: Game, className: string) {
    return this._extensions.getClassMeta(game, className);
  }

  getClassesMeta(game: Game) {
    return this._extensions.getGameClassesMeta(game);
  }

  getGameExtensions(game: Game) {
    return this._extensions.getGameExtensions(game);
  }

  getExtensionCommands(extension: string) {
    return this._extensions.getExtensionCommands(extension);
  }

  getFullDescription() {
    return combineLatest([
      this._articles.currentArticle$,
      this._articles.source$,
    ]).pipe(map((a) => a.filter(Boolean)));
  }

  onDeleteEnum() {
    this._onSaveEnum({ name: '', fields: [], isNew: false });
  }

  onCloneEnum(game: Game) {
    this._enums.cloneEnum({ enumToClone: this.enumToDisplayOrEdit!, game });
  }

  onCloneCommand(game: Game) {
    this._extensions.cloneCommand({
      game,
      command: this.command!,
      extension: this.extension!,
    });
  }

  onCopyFromCommand(game: Game) {
    const name = this.command?.name;
    if (!name) {
      return;
    }
    this._extensions
      .getGameExtensions(game)
      .pipe(take(1))
      .subscribe((extensions) => {
        for (const extension of extensions) {
          for (const command of extension.commands) {
            if (command.name === name) {
              this.command = {
                ...cloneDeep(command),
                id: this.command?.id || command.id,
              };
              return;
            }
          }
        }
      });
  }

  onEditorHasError(hasError: boolean) {
    this._ui.setEditorHasError(hasError);
  }

  onChangeSyntaxKind(syntaxKind: SyntaxKind) {
    this._ui.switchSyntaxKind(syntaxKind);
  }

  private _onSaveEnum(_enum: EnumRaw) {
    this.enumToDisplayOrEdit = _enum;
    this._enums.updateEnum({
      enumToEdit: this.enumToDisplayOrEdit!,
      oldEnumToEdit: this.oldEnumToEdit!,
    });
    this._ui.stopEditOrDisplay();
  }
}

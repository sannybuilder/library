import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import {
  ViewMode,
  Game,
  ViewContext,
  Command,
  JsonModel,
  DEFAULT_EXTENSION,
  GameSourceRepo,
  SnippetsRepo,
  EnumRaw,
} from '../../../models';
import {
  GameFacade,
  UiFacade,
  ExtensionsFacade,
  EnumsFacade,
  ScmFacade,
  SnippetsFacade,
  TreeFacade,
} from 'src/app/state';
import { ContextEditSessionService } from '../context-edit-session.service';
import {
  serializeUrlAndParams,
  getQueryParamsForCommand,
  shouldDisplayRightRail,
  getContextRouteSegment,
  getExtensionScopeSegment,
  isCodeViewContext,
  isScriptViewContext,
} from '../../../utils';
import { map } from 'rxjs/operators';

@Component({
  selector: 'scl-context-actions',
  templateUrl: './context-actions.component.html',
  styleUrls: ['./context-actions.component.scss'],
  standalone: false,
})
export class ContextActionsComponent {
  private _game = inject(GameFacade);
  private _ui = inject(UiFacade);
  private _extensions = inject(ExtensionsFacade);
  private _tree = inject(TreeFacade);
  private _snippets = inject(SnippetsFacade);
  private _enums = inject(EnumsFacade);
  private _scm = inject(ScmFacade);
  private _session = inject(ContextEditSessionService);

  ViewMode = ViewMode;
  ViewContext = ViewContext;
  readonly isCodeViewContext = isCodeViewContext;
  readonly isScriptViewContext = isScriptViewContext;

  viewContext$ = this._game.viewContext$;
  jsonModel$ = this._ui.jsonModel$;
  editorHasError$ = this._ui.editorHasError$;
  classToDisplay$ = this._ui.classToDisplay$;
  game$ = this._game.game$;
  viewMode$ = this._ui.viewMode$;
  canEdit$ = this._ui.canEdit$;
  displayInlineDescription$ = this._ui.displayInlineMethodDescription$;
  canGoBackInDecisionTree$ = this._tree.currentNode$.pipe(
    map((node) => node && node.id !== 'root'),
  );

  updateRelatedCommands = true;

  get command() {
    return this._session.command;
  }

  get oldCommand() {
    return this._session.oldCommand;
  }

  get extension() {
    return this._session.extension;
  }

  get oldExtension() {
    return this._session.oldExtension;
  }

  get snippet() {
    return this._session.snippet;
  }

  set snippet(value: string | undefined) {
    this._session.snippet = value;
  }

  get oldSnippet() {
    return this._session.oldSnippet;
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

  get scmRefsToDisplayOrEdit() {
    return this._session.scmRefsToDisplayOrEdit;
  }

  get oldScmRefsToEdit() {
    return this._session.oldScmRefsToEdit;
  }

  get scmVariablesToDisplayOrEdit() {
    return this._session.scmVariablesToDisplayOrEdit;
  }

  get oldScmVariablesToEdit() {
    return this._session.oldScmVariablesToEdit;
  }

  @Input() screenSize!: number;
  @Input() isFullScreenMode!: boolean;
  @Output() fullScreenModeChange = new EventEmitter<boolean>();

  onFullScreenModeChange(isFullScreenMode: boolean) {
    this.fullScreenModeChange.emit(isFullScreenMode);
  }

  getPermaLink({
    viewMode,
    game,
    viewContext,
    extension,
    command,
    enumName,
    className,
    jsonModel,
  }: {
    viewMode: ViewMode;
    game: Game;
    viewContext: ViewContext;
    extension?: string;
    command?: Command;
    enumName?: string;
    className?: string;
    jsonModel?: JsonModel;
  }) {
    const base = 'https://library.sannybuilder.com/#';
    const context = getContextRouteSegment(viewContext);

    if (viewContext === ViewContext.Scm) {
      const rail = this.getScmRail(viewMode, extension, command);
      const scmFileName = this._getActiveScmFileNameFromHash();
      if (rail && scmFileName) {
        const url = [base, game, context, scmFileName].join('/');
        return serializeUrlAndParams(url, { rail });
      }
    }

    if (viewMode === ViewMode.ViewAllClasses) {
      return [base, game, context, 'classes'].join('/');
    }
    if (viewMode === ViewMode.ViewAllEnums) {
      return [base, game, context, 'enums'].join('/');
    }
    if (viewMode === ViewMode.ViewAllExtensions) {
      return [base, game, context, 'extensions'].join('/');
    }

    if (viewMode === ViewMode.ViewClass) {
      return [base, game, context, 'classes', className].join('/');
    }

    if (viewMode === ViewMode.ViewEnum) {
      return [base, game, context, 'enums', enumName].join('/');
    }

    if (viewMode === ViewMode.ViewGenerateJson && jsonModel) {
      return [
        base,
        game,
        context,
        'generate',
        [jsonModel.fileName, jsonModel.selectedExtensions].join(','),
      ].join('/');
    }

    if (viewMode === ViewMode.ViewCommand) {
      if (!command) {
        return [
          base,
          game,
          context,
          getExtensionScopeSegment(viewContext),
          extension,
        ].join('/');
      }
      const url = [
        'https://sannybuilder.com/lib',
        game,
        context,
        extension,
        command.id || command.name,
      ].join('/');

      return serializeUrlAndParams(
        url,
        getQueryParamsForCommand(command, game),
      );
    }

    return undefined;
  }

  shouldDisplayRightRail(viewMode: ViewMode) {
    return shouldDisplayRightRail(viewMode);
  }

  shouldDisableSaveButton(viewMode: ViewMode, editorHasError: boolean) {
    return editorHasError || this.noChanges(viewMode);
  }

  noChanges(viewMode: ViewMode): boolean {
    if (viewMode === ViewMode.EditCommand) {
      return (
        isEqual(this.command, this.oldCommand) &&
        this.extension === this.oldExtension &&
        this.snippet === this.oldSnippet
      );
    }
    if (viewMode === ViewMode.EditEnum) {
      return isEqual(this.enumToDisplayOrEdit, this.oldEnumToEdit);
    }
    if (viewMode === ViewMode.EditScmRefs) {
      return isEqual(this.scmRefsToDisplayOrEdit, this.oldScmRefsToEdit);
    }
    if (viewMode === ViewMode.EditScmVariables) {
      return isEqual(
        this.scmVariablesToDisplayOrEdit,
        this.oldScmVariablesToEdit,
      );
    }
    return true;
  }

  resetChanges(viewMode: ViewMode) {
    if (viewMode === ViewMode.EditCommand) {
      this._ui.editCommandInfo(this.oldCommand!, this.oldExtension!);
      this.snippet = this.oldSnippet;
    }
    if (viewMode === ViewMode.EditEnum) {
      this._ui.editEnum(this.oldEnumToEdit!);
    }
    if (viewMode === ViewMode.EditScmRefs) {
      this._session.scmRefsToDisplayOrEdit = cloneDeep(this.oldScmRefsToEdit);
    }
    if (viewMode === ViewMode.EditScmVariables) {
      this._session.scmVariablesToDisplayOrEdit = cloneDeep(
        this.oldScmVariablesToEdit,
      );
    }
    return false;
  }

  onCancel() {
    this._ui.stopEditOrDisplay();
  }

  toggleInlineDesc() {
    this._ui.toggleInlineMethodDescription();
    return false;
  }

  treeBack() {
    this._tree.back();
  }

  treeRestart() {
    this._tree.restart();
  }

  generateJson() {
    this._ui.generateNewJson();
    this._ui.stopEditOrDisplay();
  }

  getQueryParamsForCommand(command: Command, game: Game) {
    return getQueryParamsForCommand(command, game);
  }

  getSourceCodeRepo(command: Command, game: Game, extension: string) {
    if (command.name) {
      if (extension === DEFAULT_EXTENSION) {
        if (GameSourceRepo[game]) {
          return `https://github.com/search?q=repo%3A${GameSourceRepo[game]}+${command.name}&type=code`;
        }
      } else if (SnippetsRepo[game]) {
        return `https://github.com/search?q=repo%3A${SnippetsRepo[game]}+${command.name}&type=code`;
      }
    }
    return '';
  }

  isNewCommand(command: Command | undefined) {
    return !command || !command.name;
  }

  getScmEditRail(viewMode: ViewMode, extension?: string, command?: Command) {
    if (viewMode === ViewMode.ViewScmRefs) {
      return 'refs/edit';
    }

    if (viewMode === ViewMode.ViewScmVariables) {
      return 'variables/edit';
    }

    if (viewMode === ViewMode.ViewCommand && extension && command) {
      const commandId = command.id || command.name;
      if (!commandId) {
        return undefined;
      }
      return `extensions/${extension}/${commandId}/edit`;
    }

    return undefined;
  }

  private getScmRail(
    viewMode: ViewMode,
    extension?: string,
    command?: Command,
  ): string | undefined {
    if (viewMode === ViewMode.ViewScmRefs) {
      return 'refs';
    }
    if (viewMode === ViewMode.EditScmRefs) {
      return 'refs/edit';
    }
    if (viewMode === ViewMode.ViewScmVariables) {
      return 'variables';
    }
    if (viewMode === ViewMode.EditScmVariables) {
      return 'variables/edit';
    }

    if (
      (viewMode === ViewMode.ViewCommand || viewMode === ViewMode.EditCommand) &&
      extension &&
      command
    ) {
      const commandId = command.id || command.name;
      if (!commandId) {
        return undefined;
      }
      return viewMode === ViewMode.EditCommand
        ? `extensions/${extension}/${commandId}/edit`
        : `extensions/${extension}/${commandId}`;
    }

    return undefined;
  }

  private _getActiveScmFileNameFromHash(): string | undefined {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const [path] = hash.split('?');
    const segments = path.split('/');
    const scmIndex = segments.indexOf('scm');
    if (scmIndex < 0 || scmIndex === segments.length - 1) {
      return undefined;
    }

    return segments.slice(scmIndex + 1).join('/');
  }

  createCommand(command: Command, extension: string) {
    this._extensions.updateCommand({
      command,
      extension,
      shouldDelete: false,
      updateRelated: false,
    });

    if (this.snippet) {
      this._snippets.updateSnippet({
        command,
        extension,
        content: this.snippet,
        updateRelated: false,
      });
    }
  }

  onSave(game: Game, viewMode: ViewMode) {
    if (viewMode === ViewMode.EditCommand) {
      this._onSaveCommand(game);
    }
    if (viewMode === ViewMode.EditEnum) {
      this._onSaveEnum();
    }
    if (viewMode === ViewMode.EditScmRefs) {
      this._onSaveScmRefs();
    }
    if (viewMode === ViewMode.EditScmVariables) {
      this._onSaveScmVariables();
    }
  }

  onDeleteCommand(game: Game) {
    if (!this.isNewCommand(this.oldCommand)) {
      this.deleteCommand(
        this.oldCommand!,
        this.oldExtension!, // ignore possible extension change
        game,
      );
    }

    this.finalizeCommandUpdate();
  }

  deleteCommand(command: Command, extension: string, game: Game) {
    this._extensions.deleteCommand({
      command,
      extension,
      game,
    });

    if (this.snippet) {
      this._snippets.deleteSnippet({
        extension,
        command,
      });
    }
  }

  finalizeCommandUpdate() {
    this._ui.stopEditOrDisplay();
    this.updateRelatedCommands = true;
  }

  private _onSaveCommand(game: Game) {
    if (this.isNewCommand(this.oldCommand)) {
      this.createCommand(this.command!, this.extension!);
      this.finalizeCommandUpdate();
      return;
    }

    delete this.command?.attrs?._unverified;

    if (
      this.extension !== this.oldExtension ||
      this.command?.name !== this.oldCommand?.name ||
      this.command?.id !== this.oldCommand?.id
    ) {
      this.deleteCommand(this.oldCommand!, this.oldExtension!, game);
      this.createCommand(this.command!, this.extension!);
      this.finalizeCommandUpdate();
      return;
    }

    if (!isEqual(this.command, this.oldCommand)) {
      this._extensions.updateCommand({
        extension: this.extension!,
        command: this.command!,
        shouldDelete: false,
        updateRelated: this.updateRelatedCommands,
      });
    }

    if (this.snippet !== this.oldSnippet) {
      this._snippets.updateSnippet({
        extension: this.extension!,
        command: this.command!,
        content: this.snippet!,
        updateRelated: this.updateRelatedCommands,
      });
    }

    this.finalizeCommandUpdate();
  }

  private _onSaveEnum() {
    this._enums.updateEnum({
      enumToEdit: this.enumToDisplayOrEdit!,
      oldEnumToEdit: this.oldEnumToEdit!,
    });
    this._ui.stopEditOrDisplay();
  }

  private _onSaveScmRefs() {
    this._scm.updateRefs(this.scmRefsToDisplayOrEdit!);
    this._ui.stopEditOrDisplay();
  }

  private _onSaveScmVariables() {
    this._scm.updateVariables(this.scmVariablesToDisplayOrEdit!);
    this._ui.stopEditOrDisplay();
  }
}

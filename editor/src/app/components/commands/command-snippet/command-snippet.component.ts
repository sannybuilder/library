import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  doesGameRequireOpcode,
  isCodeViewContext,
  isScriptViewContext,
} from '../../../utils';
import { Command, Extension, ViewContext, Game } from '../../../models';
import { UiFacade } from '../../../state';

@Component({
    selector: 'scl-command-snippet',
    templateUrl: './command-snippet.component.html',
    styleUrls: ['./command-snippet.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CommandSnippetComponent {
  ViewContext = ViewContext;
  readonly isCodeViewContext = isCodeViewContext;
  readonly isScriptViewContext = isScriptViewContext;
  @Input() snippet: string;
  @Input() game: Game;
  @Input() viewContext: ViewContext;
  @Input() command: Command;
  @Input() gameExtensions: Extension[];
  @Input() showControls: boolean = true;
  @Input() extension: Extension;

  displayOpcodePresentation$ = this._ui.displayOpcodePresentation$;
  displayFunctionDeclaration$ = this._ui.displayFunctionDeclaration$;

  constructor(private _ui: UiFacade) {}

  doesGameRequireOpcode(game: Game) {
    return doesGameRequireOpcode(game);
  }

  onToggleOpcodePresentation() {
    this._ui.toggleOpcodePresentation();
    return false;
  }

  onToggleFunctionDefinitions() {
    this._ui.toggleFunctionDeclaration();
    return false;
  }
}

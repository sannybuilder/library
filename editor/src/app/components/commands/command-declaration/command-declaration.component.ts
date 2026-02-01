import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { hasCLEOReduxSupport, isSupported, outputParams } from '../../../utils';
import {
  Command,
  Extension,
  ViewContext,
  Game,
  SyntaxKind,
} from '../../../models';
import { Router } from '@angular/router';
import { lowerFirst, upperFirst } from 'lodash';

@Component({
    selector: 'scl-command-declaration',
    templateUrl: './command-declaration.component.html',
    styleUrls: ['./command-declaration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CommandDeclarationComponent {
  ViewContext = ViewContext;
  @Input() command: Command;
  @Input() classDesc?: string;
  @Input() game: Game;
  @Input() viewContext: ViewContext;
  @Input() withToggle: boolean;
  @Input() simpleTypes: boolean;
  @Input() withCopyButton: boolean;
  @Input() gameExtensions: Extension[];
  @Input() syntaxKind: SyntaxKind;
  @Output() descriptionClick = new EventEmitter();
  @Output() switchSyntaxKind = new EventEmitter();

  constructor(private _router: Router) {}

  isSupported(command: Command) {
    return isSupported(command.attrs);
  }

  interceptDescriptionClick(event: MouseEvent) {
    this.descriptionClick.next(event);
    return false;
  }

  onDescriptionClick(e: MouseEvent) {
    if ((e.target as Element)?.tagName === 'A') {
      const href = (e.target as Element).attributes.getNamedItem('href')?.value;
      if (href) {
        const parts = href.split('/');
        this._router.navigate(['/', ...parts.slice(1)]);
      }
    }
  }

  changeSyntaxTab(syntaxKind: SyntaxKind) {
    this.switchSyntaxKind.emit(syntaxKind);
    return false;
  }

  upFirst(name: string) {
    return upperFirst(name);
  }

  lowerFirst(name: string) {
    return lowerFirst(name);
  }

  hasCLEOReduxSupport(game: Game) {
    return hasCLEOReduxSupport(game);
  }

  // https://re.cleo.li/docs/en/using-memory.html
  getReduxMethodForCommand(command: Command): string {
    let cc = upperFirst(command.cc) || 'Cdecl';
    const outputs = outputParams(command);
    if (outputs.length > 0) {
      if (outputs[0].type === 'bool') {
        return `${cc}U8`;
      }
      if (outputs[0].type === 'float') {
        return `${cc}Float`;
      }
      return `${cc}I32`;
    }
    return cc;
  }
}

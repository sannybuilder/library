import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { isSupported } from '../../../utils';
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
})
export class CommandDeclarationComponent {
  ViewContext = ViewContext;
  @Input() command: Command;
  @Input() classDesc?: string;
  @Input() game: Game;
  @Input() viewContext: ViewContext;
  @Input() withToggle = true;
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
}

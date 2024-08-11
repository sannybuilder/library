import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { isSupported } from '../../../utils';
import { Command, Extension, ViewContext, Game } from '../../../models';
import { Router } from '@angular/router';
import { GameFacade } from 'src/app/state';

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
  @Input() gameExtensions: Extension[];
  @Output() descriptionClick = new EventEmitter();

  constructor(private _router: Router, private _game: GameFacade) {}
  
  viewContext$ = this._game.viewContext$;

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
}

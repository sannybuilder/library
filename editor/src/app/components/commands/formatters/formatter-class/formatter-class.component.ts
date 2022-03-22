import { Component, Input } from '@angular/core';
import { Command, Game } from '../../../../models';

@Component({
  selector: 'scl-formatter-class',
  templateUrl: './formatter-class.component.html',
  styleUrls: ['./formatter-class.component.scss'],
})
export class FormatterClassComponent {
  @Input() command: Command;
  @Input() game: Game;
  @Input() classDesc?: string;
}

import { Component, Input } from '@angular/core';
import { lowerFirst } from 'lodash';
import { braceify } from '../../../../pipes/params';
import { Command, Game } from '../../../../models';

@Component({
  selector: 'scl-formatter-js',
  templateUrl: './formatter-js.component.html',
  styleUrls: ['./formatter-js.component.scss'],
})
export class FormatterJsComponent {
  @Input() command: Command;
  @Input() game: Game;
  @Input() classDesc?: string;

  lowerFirst(s: string): string {
    return lowerFirst(s);
  }

  getClassName(command: Command) {
    if (!command.class) {
      throw new Error(`Class name is undefined for command ${command.id}`);
    }

    const className =
      command.class === 'Object' ? 'ScriptObject' : command.class;

    return command.attrs?.is_constructor || command.attrs?.is_static
      ? className
      : braceify(className, '[]');
  }
}

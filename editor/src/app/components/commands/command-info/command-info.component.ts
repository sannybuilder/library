import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Attribute, Command, Game, Param, SupportInfo } from '../../../models';

@Component({
  selector: 'scl-command-info',
  templateUrl: './command-info.component.html',
  styleUrls: ['./command-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandInfoComponent {
  private _command: Command;
  private _attrs: Attribute[];

  @Input() set command(val: Command) {
    this._command = val;
    this._attrs = Object.entries(val?.attrs ?? {})
      .filter(([_, v]) => v)
      .map(([key]) => key as Attribute);
  }

  get command(): Command {
    return this._command;
  }

  get attrs() {
    return this._attrs;
  }
  @Input() supportInfo: SupportInfo;
  @Input() snippet?: string;
  @Input() game: Game;
  @Input() enumNames: string[] = [];
  @Input() extension: string;

  isEnumParam(param: Param) {
    return this.enumNames.includes(param.type);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Attribute,
  Command,
  Game,
  Param,
  ParamType,
  SupportInfo,
} from '../../../models';

@Component({
  selector: 'scl-command-info',
  templateUrl: './command-info.component.html',
  styleUrls: ['./command-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandInfoComponent {
  private _command: Command;
  private _attrs: Attribute[];
  private _primitives: string[] = [];
  private _enumNames: string[] = [];

  @Input() set types(val: ParamType[]) {
    this._primitives = val
      .filter((v) => v.type === 'primitive')
      .map((p) => p.name);

    this._enumNames = val.filter((v) => v.type === 'enum').map((p) => p.name);
  }

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
  @Input() extension: string;
  @Input() displayOpcodePresentation: boolean;
  @Input() relatedCommands: Command[] | undefined;
  @Output() descriptionClick = new EventEmitter();

  isPrimitiveType(param: Param) {
    return this._primitives.includes(param.type);
  }

  isEnumParam(param: Param) {
    return this._enumNames.includes(param.type);
  }

  interceptDescriptionClick(event: MouseEvent) {
    this.descriptionClick.next(event);
    return false;
  }
}

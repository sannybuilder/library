import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { doesGameRequireOpcode, getQueryParamsForCommand, isSupported } from '../../../utils';
import {
  Attribute,
  Command,
  DEFAULT_EXTENSION,
  Extension,
  Game,
  Param,
  ParamType,
  Platform,
  SupportInfo,
  Version,
  ViewContext,
} from '../../../models';
import { stringifySource } from '../../../pipes/params';

@Component({
  selector: 'scl-command-info',
  templateUrl: './command-info.component.html',
  styleUrls: ['./command-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandInfoComponent {
  DEFAULT_EXTENSION = DEFAULT_EXTENSION;
  ViewContext = ViewContext;
  private _command: Command;
  private _attrs: Attribute[];
  private _primitives: string[] = [];
  private _enumNames: string[] = [];
  classNames: string[] = [];

  customPlatforms: Platform[] = [];
  customVersions: Version[] = [];

  @Input() set types(val: ParamType[]) {
    this._primitives = val
      .filter((v) => v.type === 'primitive')
      .map((p) => p.name);

    this._enumNames = val.filter((v) => v.type === 'enum').map((p) => p.name);
    this.classNames = val
      .filter((v) => v.type === 'static' || v.type === 'dynamic')
      .map((p) => p.name);
  }

  @Input() set command(val: Command) {
    this._command = val;
    this._attrs = Object.entries(val?.attrs ?? {})
      .filter(([_, v]) => v)
      .map(([key]) => key as Attribute);

    this.customPlatforms =
      this.command.platforms?.filter((p) => p !== Platform.Any) ?? [];

    this.customVersions =
      this.command.versions?.filter((p) => p !== Version.Any) ?? [];
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
  @Input() classDesc?: string;
  @Input() gameExtensions: Extension[];
  @Input() fullDescription?: string;
  @Input() viewContext: ViewContext;

  @Output() toggleOpcodePresentation = new EventEmitter();

  isPrimitiveType(param: Param) {
    return this._primitives.includes(param.type);
  }

  isEnumParam(param: Param) {
    return this._enumNames.includes(param.type);
  }

  isClassParam(param: Param) {
    return this.classNames.includes(param.type);
  }

  getQueryParamsForCommand(command: Command, game: Game) {
    return getQueryParamsForCommand(command, game);
  }

  isSupported(command: Command) {
    return isSupported(command.attrs);
  }

  stringifySource(param: Param) {
    return stringifySource(param.source);
  }

  onToggleOpcodePresentation() {
    this.toggleOpcodePresentation.emit();
    return false;
  }

  doesGameRequireOpcode(game: Game) {
    return doesGameRequireOpcode(game);
  }

  get baseHref() {
    if (this.viewContext === ViewContext.Code) {
      return `/${this.game}/native`
    }
    return `/${this.game}/script`;
  }
}

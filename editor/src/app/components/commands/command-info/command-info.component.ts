import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { omit } from 'lodash';
import {
  doesGameRequireOpcode,
  getDefaultExtension,
  getDefaultSyntaxKind,
  getQueryParamsForCommand,
  isSupported,
} from '../../../utils';
import {
  Attribute,
  Command,
  Extension,
  Game,
  Param,
  ParamType,
  Platform,
  SupportInfo,
  SyntaxKind,
  Version,
  ViewContext,
} from '../../../models';
import { stringifySource } from '../../../pipes/params';

@Component({
    selector: 'scl-command-info',
    templateUrl: './command-info.component.html',
    styleUrls: ['./command-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CommandInfoComponent {
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
    this._command = omit(val, '_highlight');
    this._attrs = Object.entries(val?.attrs ?? {})
      .filter(([_, v]) => v)
      .map(([key]) => key as Attribute);

    this.customPlatforms =
      this.command.platforms?.filter((p) => p !== Platform.Any) ?? [];

    this.customVersions =
      this.command.versions?.filter((p) => p !== Version.Any) ?? [];
  }

  @Input() canEdit: boolean;

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
  @Input() relatedCommands: Command[] | undefined;
  @Input() classDesc?: string;
  @Input() gameExtensions: Extension[];
  @Input() fullDescription?: [string, string];
  @Input() viewContext: ViewContext;
  @Input() syntaxKind: SyntaxKind;
  @Output() switchSyntaxKind = new EventEmitter();

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

  onSwitchSyntaxKind(syntaxKind: SyntaxKind) {
    this.switchSyntaxKind.emit(syntaxKind);
    return false;
  }

  doesGameRequireOpcode(game: Game) {
    return doesGameRequireOpcode(game);
  }

  get baseHref() {
    if (this.viewContext === ViewContext.Code) {
      return `/${this.game}/native`;
    }
    return `/${this.game}/script`;
  }

  getDefaultExtension() {
    return getDefaultExtension(this.viewContext);
  }

  get defaultSyntaxKind(): SyntaxKind {
    return getDefaultSyntaxKind(this.game, this.syntaxKind);
  }
}

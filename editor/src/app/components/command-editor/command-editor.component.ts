import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
import { camelCase, capitalize, trim } from 'lodash';

import { opcodify } from '../../pipes';
import {
  Attribute,
  Command,
  CommandAttributes,
  Param,
  ParamType,
  SourceType,
  SupportInfo,
} from '../../models';
import { SelectorComponent } from '../selector/selector.component';
import { isAnyAttributeInvalid } from '../../utils/validation';
import { smash } from '../../utils';

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
})
export class CommandEditorComponent implements OnInit {
  ParamType = ParamType;
  @ViewChild(SelectorComponent) selector: SelectorComponent;

  paramTypes: string[] = [];
  shouldDisplayDuplicateNameError = false;
  shouldDisplayDuplicateParamNameError = false;
  shouldDisplayAttributeError = false;

  @Input() command: Command;
  @Input() snippet: string;
  @Input() extension: string;
  @Input() extensionNames: string[];
  @Input() supportInfo: SupportInfo;
  @Input() commands?: Command[];
  @Output() extensionChange: EventEmitter<string> = new EventEmitter();
  @Output() snippetChange: EventEmitter<string> = new EventEmitter();

  @Input() set entities(val: ParamType[]) {
    const paramTypes = new Set([
      ...this.primitiveTypes.map((t) => `type ${t}`),
      ...val.map((t) => `class ${t}`),
    ]);
    this.paramTypes = [...paramTypes];
  }

  readonly attrs: Attribute[] = CommandAttributes;
  readonly sources = [
    SourceType.any,
    SourceType.var_any,
    SourceType.var_global,
    SourceType.var_local,
    SourceType.literal,
  ];

  readonly primitiveTypes = [
    ParamType.any,
    ParamType.arguments,
    ParamType.boolean,
    ParamType.float,
    ParamType.int,
    ParamType.label,
    ParamType.string,
  ];

  ngOnInit() {
    if (this.selector) {
      this.selector.freeInput = '';
    }
  }

  onCommandNameChange(command: Command, value: string) {
    command.name = trim(
      value ? value.replace(/[\s-]/g, '_').toUpperCase() : value
    );
    this.shouldDisplayDuplicateNameError = this.getShouldDisplayDuplicateNameError();
  }

  onOpcodeChange(command: Command, value: string) {
    command.id = trim(value ? value.toUpperCase() : value);
    this.shouldDisplayDuplicateNameError = this.getShouldDisplayDuplicateNameError();
  }

  onClassChange(command: Command, value: string) {
    command.class = this.capitalizeFirst(value);
  }

  onMemberChange(command: Command, value: string) {
    command.member = this.capitalizeFirst(value);
  }

  onExtensionChange(val: string) {
    let newName = trim(val);
    if (!newName) {
      console.warn('extension can not be empty, using "default"');
      newName = 'default';
    }
    this.extensionChange.emit(newName);
  }

  onSnippetChange(val: string) {
    this.snippetChange.emit(trim(val));
  }

  opcodify(command: Command) {
    command.id = trim(opcodify(command.id));
  }

  onTypeKeyDown(key: string, param: Param) {
    switch (key) {
      case 'i':
        param.type = ParamType.int;
        break;
      case 'f':
        param.type = ParamType.float;
        break;
      case 's':
        param.type = ParamType.string;
        break;
      case 'a':
        param.type = ParamType.arguments;
        break;
      case 'b':
        param.type = ParamType.boolean;
        break;
      case 'l':
        param.type = ParamType.label;
        break;
    }
  }

  onParamNameChange(name: string, param: Param) {
    param.name = name.startsWith('_') ? name : camelCase(name); // camelCase also trims the value
    this.shouldDisplayDuplicateParamNameError = this.getShouldDisplayDuplicateParamNameError();
  }

  getDefaultInputSource(param: Param) {
    return param.source ?? SourceType.any;
  }

  getDefaultOutputSource(param: Param) {
    return param.source ?? SourceType.var_any;
  }

  onParamSourceUpdate(source: SourceType, param: Param) {
    param.source = source;
  }

  onAttrChange(command: Command, attr: Attribute, value: boolean) {
    (command.attrs ??= {})[attr] = value;
    const compressed = smash(command.attrs);
    if (compressed) {
      command.attrs = compressed;
    } else {
      delete command.attrs;
    }
    this.shouldDisplayAttributeError = this.getShouldDisplayAttributeError();
  }

  get suggestedClassName() {
    const parts = this.command.name?.split('_');

    switch (parts[1]?.toUpperCase()) {
      case 'PLAYER':
        return 'Player';
      case 'CHAR':
        return 'Char';
      case 'CAR':
      case 'VEHICLE':
        return 'Car';
      case 'OBJECT':
        return 'Object';
      case 'PICKUP':
        return 'Pickup';
      case 'CAM':
      case 'CAMERA':
        return 'Camera';
    }
  }

  get suggestedClassMember() {
    const className = this.suggestedClassName;
    if (
      className &&
      (!this.command.class || this.command.class === className)
    ) {
      const parts = this.command.name.split('_');
      parts.splice(1, 1);
      return parts.map(capitalize).join('');
    }
  }

  getSuggestedInputName(index: number) {
    if (
      index === 0 &&
      !this.command.attrs?.is_constructor &&
      !this.command.attrs?.is_static &&
      (!this.command.input?.[index]?.name ||
        this.command.input?.[index]?.name?.startsWith('_')) &&
      ['Player', 'Car', 'Char', 'Object', 'Pickup'].includes(this.command.class)
    ) {
      return 'self';
    }
  }

  getSuggestedInputType(index: number) {
    if (
      this.command.input?.[index]?.type === ParamType.any &&
      (this.command.input?.[index]?.name ||
        this.getSuggestedInputName(index)) === 'self'
    ) {
      return this.command.class || this.suggestedClassName;
    }
  }

  getSuggestedOutputName(index: number) {
    if (
      index === 0 &&
      this.command.attrs?.is_constructor &&
      (!this.command.output?.[index]?.name ||
        this.command.output?.[index]?.name.startsWith('_'))
    ) {
      return 'handle';
    }
  }

  getSuggestedOutputType(index: number) {
    if (
      index === 0 &&
      this.command.output?.length === 1 &&
      this.command.attrs?.is_constructor &&
      this.command.output?.[index]?.type === ParamType.any
    ) {
      return this.command.class || this.suggestedClassName;
    }
  }

  getSuggestedOutputSource(index: number) {
    if (
      index === 0 &&
      this.command.output?.length === 1 &&
      this.command.attrs?.is_constructor &&
      this.command.output?.[index]?.source === SourceType.any
    ) {
      return SourceType.var_any;
    }
  }

  get hasAnyError() {
    return (
      this.shouldDisplayDuplicateParamNameError ||
      this.shouldDisplayAttributeError ||
      this.shouldDisplayDuplicateNameError
    );
  }

  isParamNameDuplicate(name: string) {
    return (
      this.getAllParams().filter((param) => param.name === name).length > 1
    );
  }

  private getAllParams() {
    return [...(this.command.input ?? []), ...(this.command.output ?? [])];
  }

  private getShouldDisplayAttributeError(): boolean {
    return isAnyAttributeInvalid(this.command);
  }

  private getShouldDisplayDuplicateNameError() {
    return (this.commands ?? []).some(
      (command) =>
        command.name === this.command.name && command.id !== this.command.id
    );
  }

  private getShouldDisplayDuplicateParamNameError() {
    return this.getAllParams().some((param) =>
      this.isParamNameDuplicate(param.name)
    );
  }

  private capitalizeFirst(value?: string) {
    const camelized = camelCase(value);
    return camelized.length > 1
      ? camelized[0].toUpperCase() + camelized.substring(1)
      : camelized;
  }
}

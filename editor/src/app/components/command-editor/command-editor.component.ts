import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core';
import { camelCase, capitalize, trim, uniq } from 'lodash';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { opcodify } from '../../pipes';
import {
  Attribute,
  Command,
  CommandAttributes,
  Entity,
  Param,
  ParamType,
  SourceType,
  SupportInfo,
} from '../../models';
import { SelectorComponent } from '../selector/selector.component';
import { isAnyAttributeInvalid } from '../../utils/validation';
import { smash } from '../../utils';

type ErrorType =
  | 'duplicateName'
  | 'duplicateParamName'
  | 'invalidAttributeCombo'
  | 'noConstructorWithoutOutputParams';

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
})
export class CommandEditorComponent implements OnInit {
  private _command: Command;
  ParamType = ParamType;
  SourceType = SourceType;
  @ViewChild(SelectorComponent) selector: SelectorComponent;

  paramTypes: string[] = [];
  classes: string[] = [];

  errors: Record<ErrorType, boolean> = {
    invalidAttributeCombo: false,
    duplicateName: false,
    duplicateParamName: false,
    noConstructorWithoutOutputParams: false,
  };
  errorMessages: string[] = [];

  @Input() set command(val: Command) {
    this._command = val;
    // validate the new command
    this.updateError(...(Object.keys(this.errors) as ErrorType[]));
  }

  get command() {
    return this._command;
  }

  @Input() snippet: string;
  @Input() extension: string;
  @Input() extensionNames: string[];
  @Input() supportInfo: SupportInfo;
  @Input() commands?: Command[];
  @Output() extensionChange: EventEmitter<string> = new EventEmitter();
  @Output() snippetChange: EventEmitter<string> = new EventEmitter();
  @Output() hasError: EventEmitter<boolean> = new EventEmitter();

  @Input() set entities(val: Entity[]) {
    const dynamicClasses = val.filter((v) => v.type === 'dynamic');
    this.paramTypes = uniq([
      ...this.primitiveTypes.map((t) => `type ${t}`),
      ...dynamicClasses.map(({ name }) => `class ${name}`),
    ]);
    this.classes = val.map(
      (v) => `${v.type === 'dynamic' ? 'class' : 'static'} ${v.name}`
    );
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
  readonly errorHandlers: Record<ErrorType, () => void> = {
    invalidAttributeCombo: this.updateAttributeError,
    duplicateName: this.updateDuplicateNameError,
    duplicateParamName: this.updateDuplicateParamNameError,
    noConstructorWithoutOutputParams: this.updateNoOutputParamsError,
  };
  readonly messages: Record<ErrorType, string> = {
    invalidAttributeCombo: 'Invalid combination of attributes',
    duplicateParamName: 'Duplicate parameter name',
    duplicateName: 'Duplicate command name',
    noConstructorWithoutOutputParams: `is_constructor can't be used in a command without an output param`,
  };

  ngOnInit() {
    if (this.selector) {
      this.selector.freeInput = '';
    }
  }

  updateError(...errors: ErrorType[]) {
    errors.forEach((error) => this.errorHandlers[error].call(this));
    this.errorMessages = Object.entries(this.errors)
      .filter(([_, v]) => v)
      .map(([k, _]) => this.messages[k as ErrorType]);
    this.hasError.emit(this.errorMessages.length > 0);
  }

  onCommandNameChange(command: Command, value: string) {
    command.name = trim(
      value ? value.replace(/[\s-]/g, '_').toUpperCase() : value
    );
    this.updateError('duplicateName');
  }

  onOpcodeChange(command: Command, value: string) {
    command.id = trim(value ? value.toUpperCase() : value);
    this.updateError('duplicateName');
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
    this.updateError('duplicateParamName');
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
    this.updateError(
      'invalidAttributeCombo',
      'noConstructorWithoutOutputParams'
    );
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
      case 'BLIP':
        return 'Blip';
    }
  }

  get suggestedClassMember() {
    const className = this.suggestedClassName;
    if (className && this.command.class === className) {
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
      ['Player', 'Car', 'Char', 'Object', 'Pickup', 'Blip'].includes(
        this.command.class
      )
    ) {
      return 'self';
    }
  }

  getSuggestedInputType(index: number) {
    const { name, type } = this.command.input?.[index];
    if (
      this.primitiveTypes.includes(type) &&
      (name || this.getSuggestedInputName(index)) === 'self'
    ) {
      return this.command.class || this.suggestedClassName;
    }

    if (['state', 'flag'].includes(name) && type !== ParamType.boolean) {
      return ParamType.boolean;
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

  isParamNameDuplicate(name: string) {
    return (
      !!name &&
      this.getAllParams().filter((param) => param.name === name).length > 1
    );
  }

  drop(event: CdkDragDrop<Param[]>, newSource: SourceType) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex].source = newSource;
    }
  }

  private getAllParams() {
    return [...(this.command.input ?? []), ...(this.command.output ?? [])];
  }

  private updateAttributeError() {
    this.errors.invalidAttributeCombo = isAnyAttributeInvalid(this.command);
  }

  private updateDuplicateNameError() {
    this.errors.duplicateName = (this.commands ?? []).some(
      (command) =>
        command.name === this.command.name && command.id !== this.command.id
    );
  }

  private updateDuplicateParamNameError() {
    this.errors.duplicateParamName = this.getAllParams().some((param) =>
      this.isParamNameDuplicate(param.name)
    );
  }

  private updateNoOutputParamsError() {
    this.errors.noConstructorWithoutOutputParams =
      this.command.attrs?.is_constructor && !this.command.output?.length;
  }

  private capitalizeFirst(value?: string) {
    const camelized = camelCase(value);
    return camelized.length > 1
      ? camelized[0].toUpperCase() + camelized.substring(1)
      : camelized;
  }
}

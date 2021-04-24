import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnInit,
  ChangeDetectionStrategy,
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
  Param,
  ParamType,
  Primitive,
  PrimitiveType,
  SourceType,
  SupportInfo,
} from '../../models';
import { SelectorComponent } from '../selector/selector.component';
import { isAnyAttributeInvalid } from '../../utils/validation';
import { capitalizeFirst, smash } from '../../utils';

type ErrorType =
  | 'duplicateName'
  | 'duplicateParamName'
  | 'invalidAttributeCombo'
  | 'noConstructorWithoutOutputParams';

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandEditorComponent implements OnInit {
  private _command: Command;
  PrimitiveType = PrimitiveType;
  SourceType = SourceType;
  @ViewChild(SelectorComponent) selector: SelectorComponent;

  paramTypes: string[] = [];
  classes: string[] = [];
  primitives: PrimitiveType[] = [];

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

  @Input() set types(val: ParamType[]) {
    const prefixes: Record<ParamType['type'], string> = {
      primitive: 'type',
      dynamic: 'class',
      enum: 'enum',
      static: 'static',
    };
    const {
      primitive: primitives,
      dynamic: dynamics,
      enum: enums,
      static: statics,
    }: Record<ParamType['type'], string[]> = val.reduce(
      (m, v) => {
        m[v.type].push(`${prefixes[v.type]} ${v.name}`);
        return m;
      },
      {
        primitive: [],
        dynamic: [],
        enum: [],
        static: [],
      }
    );

    this.paramTypes = uniq([...primitives, ...enums, ...dynamics]);
    this.primitives = val
      .filter((v): v is Primitive => v.type === 'primitive')
      .map((p) => p.name);
    this.classes = [...dynamics, ...statics];
  }

  readonly attrs: Attribute[] = CommandAttributes;
  readonly sources = [
    SourceType.any,
    SourceType.var_any,
    SourceType.var_global,
    SourceType.var_local,
    SourceType.literal,
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
    command.class = capitalizeFirst(value);
  }

  onMemberChange(command: Command, value: string) {
    command.member = capitalizeFirst(value);
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
        param.type = PrimitiveType.int;
        break;
      case 'f':
        param.type = PrimitiveType.float;
        break;
      case 's':
        param.type = PrimitiveType.string;
        break;
      case 'a':
        param.type = PrimitiveType.arguments;
        break;
      case 'b':
        param.type = PrimitiveType.boolean;
        break;
      case 'p':
      case 'l':
        param.type = PrimitiveType.label;
        break;
      case 'o':
        param.type = PrimitiveType.model_any;
        break;
      case 'm':
        param.type = PrimitiveType.model_ide;
        break;
      case 'g':
        param.type = PrimitiveType.gxt_key;
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
      this.primitives.includes(type as PrimitiveType) &&
      (name || this.getSuggestedInputName(index)) === 'self'
    ) {
      return this.command.class || this.suggestedClassName;
    }

    if (['state', 'flag'].includes(name) && type !== PrimitiveType.boolean) {
      return PrimitiveType.boolean;
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
      this.command.output?.[index]?.type === PrimitiveType.any
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
}

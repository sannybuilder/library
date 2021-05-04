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

import { opcodify } from '../../../pipes';
import {
  Attribute,
  Command,
  CommandAttributes,
  Game,
  GameSupportInfo,
  Param,
  ParamType,
  Primitive,
  PrimitiveType,
  SourceType,
  SupportLevel,
} from '../../../models';
import { SelectorComponent } from '../../common/selector/selector.component';
import { isAnyAttributeInvalid, capitalizeFirst, smash } from '../../../utils';

type ErrorType =
  | 'emptyName'
  | 'emptyOpcode'
  | 'duplicateName'
  | 'duplicateParamName'
  | 'invalidAttributeCombo'
  | 'noConstructorWithoutOutputParams'
  | 'noSelfInStaticMethod'
  | 'missingSelfParamInMethod';

const DEFAULT_INPUT_SOURCE = SourceType.any;
const DEFAULT_OUTPUT_SOURCE = SourceType.var_any;
const SELF = 'self';

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandEditorComponent implements OnInit {
  private _command: Command;
  private _supportInfo: GameSupportInfo[] | undefined;

  PrimitiveType = PrimitiveType;
  SourceType = SourceType;
  @ViewChild(SelectorComponent) selector: SelectorComponent;

  isNew: boolean;
  paramTypes: string[] = [];
  classes: string[] = [];
  primitives: PrimitiveType[] = [];
  cloneTargets: Array<{ name: string; value: Game }> = [];

  errors: Record<ErrorType, boolean> = {
    emptyName: false,
    emptyOpcode: false,
    invalidAttributeCombo: false,
    duplicateName: false,
    duplicateParamName: false,
    noConstructorWithoutOutputParams: false,
    noSelfInStaticMethod: false,
    missingSelfParamInMethod: false,
  };
  errorMessages: string[] = [];

  @Input() set command(val: Command) {
    this._command = val;
    this.isNew = !this.command.name;
    // validate the new command
    this.updateErrors();
    this.isDirty = false;
  }

  get command() {
    return this._command;
  }

  @Input() snippet: string;
  @Input() extension: string;
  @Input() extensionNames: string[];
  @Input() set supportInfo(val: GameSupportInfo[] | undefined) {
    this._supportInfo = val;

    const games = Object.entries(Game);
    this.cloneTargets = games
      .filter(([_, game]) =>
        val?.some(
          (info) =>
            info.game === game && info.level === SupportLevel.DoesNotExist
        )
      )
      .map(([name, value]) => ({ name, value }));
  }

  get supportInfo() {
    return this._supportInfo;
  }
  @Input() commands?: Command[];
  @Output() extensionChange: EventEmitter<string> = new EventEmitter();
  @Output() snippetChange: EventEmitter<string> = new EventEmitter();
  @Output() hasError: EventEmitter<boolean> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() clone: EventEmitter<Game> = new EventEmitter();

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
      } as Record<ParamType['type'], string[]>
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
    emptyName: this.updateEmptyNameError,
    emptyOpcode: this.updateEmptyOpcodeError,
    noSelfInStaticMethod: this.noSelfInStaticMethod,
    missingSelfParamInMethod: this.missingSelfParamInMethod,
  };

  isDirty: boolean;
  isInvalid: boolean;

  ngOnInit() {
    if (this.selector) {
      this.selector.freeInput = '';
    }
  }

  updateErrors() {
    this.isDirty = true;
    this.updateError(...(Object.keys(this.errors) as ErrorType[]));
    return false;
  }

  updateError(...errors: ErrorType[]) {
    errors.forEach((error) => this.errorHandlers[error].call(this));
    this.errorMessages = Object.entries(this.errors)
      .filter(([_, v]) => v)
      .map(([k, _]) => `ui.errors.command.${k}`);
    this.isInvalid = this.errorMessages.length > 0;
    this.hasError.emit(this.isInvalid);
  }

  onCommandNameChange(command: Command, value: string) {
    command.name = trim(
      value ? value.replace(/[\s-]/g, '_').toUpperCase() : value
    );
    this.updateErrors();
  }

  onOpcodeChange(command: Command, value: string) {
    command.id = trim(value ? value.toUpperCase() : value);
    this.updateErrors();
  }

  onClassChange(command: Command, value: string) {
    command.class = capitalizeFirst(value);
    this.updateErrors();
  }

  onMemberChange(command: Command, value: string) {
    command.member = capitalizeFirst(value);
    this.updateErrors();
  }

  onExtensionChange(val: string) {
    let newName = trim(val);
    if (!newName) {
      console.warn('extension can not be empty, using "default"');
      newName = 'default';
    }
    this.extensionChange.emit(newName);
    this.updateErrors();
  }

  onSnippetChange(val: string) {
    this.snippetChange.emit(trim(val));
    this.updateErrors();
  }

  onShortDescriptionChange(command: Command, val: string) {
    command.short_desc = val;
    this.updateErrors();
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
    this.updateErrors();
  }

  onParamNameChange(name: string, param: Param) {
    param.name = name.startsWith('_') ? name : camelCase(name); // camelCase also trims the value
    this.updateErrors();
  }

  getDefaultInputSource(param: Param) {
    return param.source ?? DEFAULT_INPUT_SOURCE;
  }

  getDefaultOutputSource(param: Param) {
    return param.source ?? DEFAULT_OUTPUT_SOURCE;
  }

  onParamSourceUpdate(source: SourceType, param: Param) {
    param.source = source;
    this.updateErrors();
  }

  onAttrChange(command: Command, attr: Attribute, value: boolean) {
    (command.attrs ??= {})[attr] = value;
    const compressed = smash(command.attrs);
    if (compressed) {
      command.attrs = compressed;
    } else {
      delete command.attrs;
    }
    this.updateErrors();
  }

  get suggestedClassName(): string {
    const parts = this.command.name!.split('_');

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
      case 'MENU':
        return 'Menu';
      case 'GROUP':
        return 'Group';
    }

    return '';
  }

  get suggestedClassMember(): string {
    const className = this.suggestedClassName;
    if (className && this.command.class === className) {
      const parts = this.command.name!.split('_');
      parts.splice(1, 1);
      return parts.map(capitalize).join('');
    }
    return '';
  }

  getSuggestedInputName(index: number): string {
    const { name } = this.command.input?.[index] ?? {};
    if (
      index === 0 &&
      !this.command.attrs?.is_constructor &&
      !this.command.attrs?.is_static &&
      (!name || name.startsWith('_')) &&
      [
        'Player',
        'Car',
        'Char',
        'Object',
        'Pickup',
        'Blip',
        'Menu',
        'Group',
      ].includes(this.command.class!)
    ) {
      return SELF;
    }
    return '';
  }

  getSuggestedInputType(index: number): string {
    const { name, type } = this.command.input?.[index] ?? { name: '' };
    if (
      this.primitives.includes(type as PrimitiveType) &&
      (name || this.getSuggestedInputName(index)) === SELF
    ) {
      return this.command.class || this.suggestedClassName;
    }

    if (['state', 'flag'].includes(name) && type !== PrimitiveType.boolean) {
      return PrimitiveType.boolean;
    }

    // suggest the type if the input name is same called
    const split = (word: string) =>
      word.split(/(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/);
    const last = (list: unknown[]) => list && list[list.length - 1];
    const cmp = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

    const lastWord = last(split(name));

    if (typeof lastWord === 'string') {
      if (cmp(lastWord, 'vehicle') && type !== 'Car') {
        return 'Car';
      }

      for (const paramType of this.paramTypes) {
        const typeName = paramType.split(' ')[1];
        if (cmp(lastWord, typeName) && type !== typeName) {
          return typeName;
        }
      }
    }

    return '';
  }

  getSuggestedOutputName(index: number): string {
    if (
      index === 0 &&
      this.command.attrs?.is_constructor &&
      (!this.command.output?.[index]?.name ||
        this.command.output?.[index]?.name.startsWith('_'))
    ) {
      return 'handle';
    }
    return '';
  }

  getSuggestedOutputType(index: number): string {
    if (
      index === 0 &&
      this.command.output?.length === 1 &&
      this.command.attrs?.is_constructor &&
      this.command.output?.[index]?.type === PrimitiveType.any
    ) {
      return this.command.class || this.suggestedClassName;
    }
    return '';
  }

  getSuggestedOutputSource(index: number): string {
    if (
      index === 0 &&
      this.command.output?.length === 1 &&
      this.command.attrs?.is_constructor &&
      this.command.output?.[index]?.source === SourceType.any
    ) {
      return SourceType.var_any;
    }
    return '';
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

  addInput() {
    this.command.input ??= [];
    this.command.input.push({
      name: '',
      type: PrimitiveType.any,
      source: DEFAULT_INPUT_SOURCE,
    });
    this.command.num_params++;
    this.updateErrors();
  }

  deleteCommand() {
    this.delete.emit();
  }

  deleteInput(index: number) {
    this.command.input!.splice(index, 1);
    this.command.num_params--;
    this.updateErrors();
  }

  deleteOutput(index: number) {
    this.command.output!.splice(index, 1);
    this.command.num_params--;
    this.updateErrors();
  }

  canClone() {
    return !this.isNew && this.cloneTargets.length > 0;
  }

  cloneCommand(game: Game) {
    if (!this.isInvalid) {
      this.clone.emit(game);
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
      !!this.command.attrs?.is_constructor && !this.command.output?.length;
  }

  private updateEmptyNameError() {
    this.errors.emptyName = !this.command.name;
  }

  private updateEmptyOpcodeError() {
    this.errors.emptyOpcode = !this.command.id;
  }

  private noSelfInStaticMethod() {
    this.errors.noSelfInStaticMethod =
      !!this.command.attrs?.is_static &&
      this.getAllParams().some((p) => p.name === SELF);
  }

  private missingSelfParamInMethod() {
    const { is_static, is_keyword, is_nop, is_unsupported, is_constructor } =
      this.command.attrs ?? {};
    const { class: className, member, num_params } = this.command;
    this.errors.missingSelfParamInMethod =
      !is_static &&
      !is_keyword &&
      !is_nop &&
      !is_unsupported &&
      !is_constructor &&
      !!className &&
      !!member &&
      num_params > 0 &&
      !this.getAllParams().some((p) => p.name === SELF);
  }
}

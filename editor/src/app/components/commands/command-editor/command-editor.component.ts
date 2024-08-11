import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { capitalize, trim, uniq } from 'lodash';
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

  ViewContext,
  Game,
  GamePlatforms,
  GameSupportInfo,
  GameVersions,
  Param,
  ParamType,
  Platform,
  Primitive,
  PrimitiveType,
  SourceType,
  SupportLevel,
  Version,
} from '../../../models';
import { SelectorComponent } from '../../common/selector/selector.component';
import {
  doesCommandHaveAnyAttributeInvalid,
  capitalizeFirst,
  smash,
  doesCommandHaveDuplicateName,
  isCommandParamNameDuplicate,
  doesCommandHaveDuplicateParamName,
  doesConstructorCommandHaveNoOutputParams,
  doesGetterCommandReturnNothing,
  doesCommandHaveEmptyName,
  doesCommandHaveEmptyId,
  doesCommandHaveSelfInStaticMethod,
  doesCommandHaveMissingSelfParamInMethod,
  formatParamName,
  getDefaultCommandNameFormatter,
  formatOpcode,
  doesCommandDescriptionHaveTrailingPeriod,
  doesCommandDescriptionNotStartWith3rdPersonVerb,
  doesConstructorNotReturnHandle,
  doesGameRequireOpcode,
  normalizeId,
  doesCommandHaveInvalidOpcode,
  doesCommandHaveOutOfRangeOpcode,
  doesCommandHaveAnInvalidClassName,
  doesCommandHaveAnInvalidMethodName,
  doesCommandHaveInvalidConditionalOperator,
  doesCommandHaveInvalidArgumentWithOperator,
  doesSelfArgumentHaveInvalidType,
  doesOutputHaveInvalidSource,
  primitiveTypes,
  getDefaultExtension,
} from '../../../utils';

type ErrorType =
  | 'emptyName'
  | 'emptyOpcode'
  | 'invalidOpcode'
  | 'outOfRangeOpcode'
  | 'duplicateName'
  | 'duplicateParamName'
  | 'invalidAttributeCombo'
  | 'noConstructorWithoutOutputParams'
  | 'noGetterWithoutResult'
  | 'noSelfInStaticMethod'
  | 'missingSelfParamInMethod'
  | 'trailingPeriodInDescription'
  | 'no3rdPersonVerb'
  | 'constructorNotReturningHandle'
  | 'invalidClassName'
  | 'invalidMethodName'
  | 'invalidConditionalOperator'
  | 'invalidArgumentWithOperator'
  | 'invalidSelfType'
  | 'invalidOutputSource';

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
  private _viewContext: ViewContext;

  PrimitiveType = PrimitiveType;
  SourceType = SourceType;
  Platform = Platform;
  Version = Version;

  @ViewChild(SelectorComponent) selector: SelectorComponent;

  isNew: boolean;
  paramTypes: string[] = [];
  classes: string[] = [];
  primitives: PrimitiveType[] = [];
  cloneTargets: Game[] = [];
  defaultCommandNameFormatter: (name: string | undefined) => string | undefined;

  features = {
    opcode: true,
    operator: true,
    cc: false,
  };

  ccs = ['cdecl', 'stdcall', 'thiscall'];

  operations = [
    'assignment =',
    'addition +',
    'subtraction -',
    'multiplication *',
    'division /',
    'timed_addition +=@',
    'timed_subtraction -=@',
    'cast_assignment =#',
    'is_equal_to ==',
    'is_greater_than >',
    'is_greater_or_equal_to >=',
    'and &',
    'or |',
    'xor ^',
    'not ~',
    'mod %',
    'shift_left <<',
    'shift_right >>',
  ];

  errors: Record<ErrorType, boolean> = {
    emptyName: false,
    emptyOpcode: false,
    invalidOpcode: false,
    outOfRangeOpcode: false,
    invalidAttributeCombo: false,
    duplicateName: false,
    duplicateParamName: false,
    noConstructorWithoutOutputParams: false,
    noGetterWithoutResult: false,
    noSelfInStaticMethod: false,
    missingSelfParamInMethod: false,
    trailingPeriodInDescription: false,
    no3rdPersonVerb: false,
    constructorNotReturningHandle: false,
    invalidClassName: false,
    invalidMethodName: false,
    invalidConditionalOperator: false,
    invalidArgumentWithOperator: false,
    invalidSelfType: false,
    invalidOutputSource: false,
  };
  errorMessages: string[] = [];

  platforms: Array<{ name: Platform; status: boolean }> = [];

  versions: Array<{ name: Version; status: boolean }> = [];

  @Input() set viewContext(val: ViewContext) {
    this._viewContext = val;

    if (val === ViewContext.Code) {
      this.features.opcode = false;
      this.features.operator = false;
      this.features.cc = true;
    }
  }

  get viewContext() {
    return this._viewContext;
  }

  @Input() set game(val: Game) {
    this.versions = GameVersions[val].map((name) => ({ name, status: false }));
    this.platforms = GamePlatforms[val].map((name) => ({
      name,
      status: false,
    }));
    this.sources = [
      SourceType.any,
      SourceType.var_any,
      SourceType.var_global,
      SourceType.var_local,
      SourceType.literal,
    ];
    if (val === Game.gta_iv) {
      this.sources.push(SourceType.pointer);
    }
    this.features.opcode = doesGameRequireOpcode(val);
    this.defaultCommandNameFormatter = getDefaultCommandNameFormatter(val);
  }

  @Input() set command(val: Command) {
    this._command = val;
    this.isNew = !this.command.name;
    // validate the new command
    this.updateErrors();
    this.isDirty = false;
    this.platforms.forEach((p) => {
      p.status = this.hasPlatform(p.name);
    });
    this.versions.forEach((p) => {
      p.status = this.hasVersion(p.name);
    });
  }

  get command() {
    return this._command;
  }

  @Input() snippet: string;
  @Input() extension: string;
  @Input() extensionNames: string[];
  @Input() set supportInfo(val: GameSupportInfo[] | undefined) {
    this._supportInfo = val;

    const games = Object.values(Game);
    this.cloneTargets = games.filter((game) =>
      val?.some(
        (info) => info.game === game && info.level === SupportLevel.DoesNotExist
      )
    );
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
  sources: SourceType[] = [];

  readonly errorHandlers: Record<ErrorType, () => void> = {
    invalidAttributeCombo: this.updateAttributeError,
    duplicateName: this.updateDuplicateNameError,
    duplicateParamName: this.updateDuplicateParamNameError,
    noConstructorWithoutOutputParams:
      this.updateNoConstructorWithoutOutputParamsError,
    noGetterWithoutResult: this.updateNoGetterWithoutResultError,
    emptyName: this.updateEmptyNameError,
    emptyOpcode: this.updateEmptyOpcodeError,
    invalidOpcode: this.updateInvalidOpcodeError,
    outOfRangeOpcode: this.updateOutOfRangeOpcodeError,
    noSelfInStaticMethod: this.noSelfInStaticMethod,
    missingSelfParamInMethod: this.missingSelfParamInMethod,
    trailingPeriodInDescription: this.trailingPeriodInDescriptionError,
    no3rdPersonVerb: this.no3rdPersonVerbError,
    constructorNotReturningHandle: this.constructorNotReturningHandleError,
    invalidClassName: this.invalidClassNameError,
    invalidMethodName: this.invalidMethodNameError,
    invalidConditionalOperator: this.invalidConditionalOperatorError,
    invalidArgumentWithOperator: this.invalidArgumentWithOperatorError,
    invalidSelfType: this.invalidSelfTypeError,
    invalidOutputSource: this.invalidOutputSourceError,
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
    command.name = trim(this.defaultCommandNameFormatter(value));
    this.updateErrors();
  }

  onOpcodeChange(command: Command, value: string) {
    command.id = trim(formatOpcode(value));
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

  onOperationChange(command: Command, operator: string) {
    command.operator = operator;
    this.updateErrors();
  }

  onExtensionChange(val: string) {
    let newName = trim(val);
    if (!newName) {
      console.warn('extension can not be empty, using "default"');
      newName = getDefaultExtension(this.viewContext);
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
    if (command.id) {
      command.id = trim(opcodify(command.id));
      this.updateErrors();
    }
  }

  onTypeKeyDown(key: string, param: Param) {
    const primitives = primitiveTypes(this.game, this.viewContext);
    let newType;
    switch (key) {
      case 'i':
        newType = PrimitiveType.int;
        break;
      case 'f':
        newType = PrimitiveType.float;
        break;
      case 's':
        newType = PrimitiveType.string;
        break;
      case 'a':
        newType = PrimitiveType.arguments;
        break;
      case 'b':
        newType = PrimitiveType.boolean;
        break;
      case 'p':
      case 'l':
        newType = PrimitiveType.label;
        break;
      case 'o':
      case 'm':
        newType = PrimitiveType.model_any;
        break;
      case 'g':
        newType = PrimitiveType.gxt_key;
        break;
      case 'z':
        newType = PrimitiveType.zone_key;
        break;
    }

    if (newType && newType !== param.type && primitives.includes(newType)) {
      param.type = newType;
      this.updateErrors();
    }
  }

  onTypeChange(key: string, param: Param) {
    param.type = key;
    this.updateErrors();
  }

  onParamNameChange(name: string, param: Param) {
    param.name = formatParamName(name); // camelCase also trims the value
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

  hasAnyPlatform() {
    return (
      !this.command.platforms ||
      !this.command.platforms.length ||
      this.hasPlatform(Platform.Any)
    );
  }

  hasPlatform(platform: Platform) {
    return !!this.command.platforms?.includes(platform);
  }

  setAnyPlatform() {
    this.command.platforms = [Platform.Any];
    this.platforms.forEach((p) => {
      p.status = false;
    });
  }

  onPlatformToggle(platform: Platform, event: MouseEvent) {
    const shouldAdd = !this.hasPlatform(platform);
    this.command.platforms = this.command.platforms?.filter(
      (p) => p !== platform && p !== Platform.Any
    );

    if (shouldAdd) {
      this.command.platforms ??= [];
      this.command.platforms.push(platform);
    }

    const length = this.command.platforms?.length || 0;
    if (length === 0 || length === this.platforms.length) {
      this.setAnyPlatform();
      (event.target as HTMLInputElement).checked = false;
    }
  }

  hasAnyVersion() {
    return (
      !this.command.versions ||
      !this.command.versions.length ||
      this.hasVersion(Version.Any)
    );
  }

  hasVersion(version: Version) {
    return !!this.command.versions?.includes(version);
  }

  setAnyVersion() {
    this.command.versions = [Version.Any];
    this.versions.forEach((p) => {
      p.status = false;
    });
  }

  onVersionToggle(version: Version, event: MouseEvent) {
    const shouldAdd = !this.hasVersion(version);
    this.command.versions = this.command.versions?.filter(
      (p) => p !== version && p !== Version.Any
    );

    if (shouldAdd) {
      this.command.versions ??= [];
      this.command.versions.push(version);
    }

    const length = this.command.versions?.length || 0;
    if (length === 0 || length === this.versions.length) {
      this.setAnyVersion();
      (event.target as HTMLInputElement).checked = false;
    }
  }

  get suggestedClassName(): string {
    const parts = this.command.name.split('_');

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
      const parts = this.command.name.split('_');
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

    if (
      ['x', 'y', 'z', 'angle'].includes(name) &&
      type !== PrimitiveType.float
    ) {
      return PrimitiveType.float;
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

  get suggestedOpcodeId(): string {
    return normalizeId(this.command.id);
  }

  isParamNameDuplicate(name: string) {
    return isCommandParamNameDuplicate(this.command, name);
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
    this.updateErrors();
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

  private updateAttributeError() {
    this.errors.invalidAttributeCombo = doesCommandHaveAnyAttributeInvalid(
      this.command
    );
  }

  private updateDuplicateNameError() {
    this.errors.duplicateName = doesCommandHaveDuplicateName(
      this.command,
      this.commands
    );
  }

  private updateDuplicateParamNameError() {
    this.errors.duplicateParamName = doesCommandHaveDuplicateParamName(
      this.command
    );
  }

  private updateNoConstructorWithoutOutputParamsError() {
    this.errors.noConstructorWithoutOutputParams =
      doesConstructorCommandHaveNoOutputParams(this.command);
  }

  private updateNoGetterWithoutResultError() {
    this.errors.noGetterWithoutResult = doesGetterCommandReturnNothing(
      this.command
    );
  }

  private updateEmptyNameError() {
    this.errors.emptyName = doesCommandHaveEmptyName(this.command);
  }

  private updateEmptyOpcodeError() {
    this.errors.emptyOpcode =
      this.features.opcode && doesCommandHaveEmptyId(this.command);
  }

  private updateInvalidOpcodeError() {
    this.errors.invalidOpcode =
      this.features.opcode && doesCommandHaveInvalidOpcode(this.command);
  }

  private updateOutOfRangeOpcodeError() {
    this.errors.outOfRangeOpcode =
      this.features.opcode && doesCommandHaveOutOfRangeOpcode(this.command);
  }

  private noSelfInStaticMethod() {
    this.errors.noSelfInStaticMethod = doesCommandHaveSelfInStaticMethod(
      this.command
    );
  }

  private missingSelfParamInMethod() {
    this.errors.missingSelfParamInMethod =
      doesCommandHaveMissingSelfParamInMethod(this.command);
  }

  private trailingPeriodInDescriptionError() {
    this.errors.trailingPeriodInDescription =
      doesCommandDescriptionHaveTrailingPeriod(this.command);
  }

  private no3rdPersonVerbError() {
    this.errors.no3rdPersonVerb =
      doesCommandDescriptionNotStartWith3rdPersonVerb(this.command);
  }

  private constructorNotReturningHandleError() {
    this.errors.constructorNotReturningHandle = doesConstructorNotReturnHandle(
      this.command
    );
  }

  private invalidClassNameError() {
    this.errors.invalidClassName = doesCommandHaveAnInvalidClassName(
      this.command
    );
  }

  private invalidMethodNameError() {
    this.errors.invalidMethodName = doesCommandHaveAnInvalidMethodName(
      this.command
    );
  }

  private invalidConditionalOperatorError() {
    this.errors.invalidConditionalOperator =
      doesCommandHaveInvalidConditionalOperator(this.command);
  }

  private invalidArgumentWithOperatorError() {
    this.errors.invalidArgumentWithOperator =
      doesCommandHaveInvalidArgumentWithOperator(this.command);
  }

  private invalidSelfTypeError() {
    this.errors.invalidSelfType = doesSelfArgumentHaveInvalidType(this.command);
  }

  private invalidOutputSourceError() {
    this.errors.invalidOutputSource = doesOutputHaveInvalidSource(this.command);
  }
}

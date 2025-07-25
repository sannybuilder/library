import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ElementRef,
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
  Extension,
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
  doesCommandHaveInvalidArguments,
  getDefaultExtension,
  doesCommandHaveEmptyCallingConvention,
  filterAttributes,
  filterSources,
  doesScriptCommandHaveEmptyMember,
  doesNativeFunctionHaveNoName,
  formatNativeName,
} from '../../../utils';

type ErrorType =
  | 'emptyName'
  | 'emptyOpcode'
  | 'emptyCallingConvention'
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
  | 'invalidOutputSource'
  | 'emptyMember'
  | 'invalidArguments';

const DEFAULT_INPUT_SOURCE = SourceType.any;
const DEFAULT_OUTPUT_SOURCE = SourceType.var_any;
const SELF = 'self';

@Component({
  selector: 'scl-command-editor',
  templateUrl: './command-editor.component.html',
  styleUrls: ['./command-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CommandEditorComponent implements OnInit {
  @ViewChild('snippetText') snippetText: ElementRef<HTMLTextAreaElement>;

  private _command: Command;
  private _supportInfo: GameSupportInfo[] | undefined;
  private _viewContext: ViewContext;
  private _game: Game;
  private _extensions: Extension[] = [];

  PrimitiveType = PrimitiveType;
  SourceType = SourceType;
  Platform = Platform;
  Version = Version;
  ViewContext = ViewContext;

  @ViewChild(SelectorComponent) selector: SelectorComponent;

  isNew: boolean;
  displaySnippetPreview: boolean;
  paramTypes: string[] = [];
  classes: string[] = [];
  primitives: PrimitiveType[] = [];
  cloneTargets: Game[] = [];
  defaultCommandNameFormatter: (name: string | undefined) => string | undefined;
  codeTokens: string[] = [];
  games: Game[] = Object.values(Game);

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
    emptyCallingConvention: false,
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
    emptyMember: false,
    invalidArguments: false,
  };
  errorMessages: string[] = [];
  extensionNames: string[] = [];
  platforms: Array<{ name: Platform; status: boolean }> = [];
  versions: Array<{ name: Version; status: boolean }> = [];

  @Input() set viewContext(val: ViewContext) {
    this._viewContext = val;

    if (val === ViewContext.Code) {
      this.features.opcode = false;
      this.features.operator = false;
      this.features.cc = true;
      this.codeTokens = [];
    }

    this.sources = filterSources(this.game, this.viewContext);
    this.attrs = filterAttributes(
      CommandAttributes,
      this.game,
      this.viewContext
    );
  }

  get game() {
    return this._game;
  }

  get viewContext() {
    return this._viewContext;
  }

  @Input() set game(val: Game) {
    this._game = val;
    this.versions = GameVersions[val].map((name) => ({ name, status: false }));
    this.platforms = GamePlatforms[val].map((name) => ({
      name,
      status: false,
    }));
    this.sources = filterSources(this.game, this.viewContext);
    this.features.opcode = doesGameRequireOpcode(val);
    this.defaultCommandNameFormatter = getDefaultCommandNameFormatter(val);
    this.attrs = filterAttributes(
      CommandAttributes,
      this.game,
      this.viewContext
    );
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
  @Input() set extensions(val: Extension[]) {
    this.extensionNames = val.map((e) => e.name);
    this._extensions = val;
  }
  get extensions() {
    return this._extensions;
  }
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
  @Output() copyFrom: EventEmitter<Game> = new EventEmitter();
  @Input() fullDescription?: [string, string];

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
        const words = [prefixes[v.type], v.name];
        if (v.type === 'primitive' && this.getPrimitiveTypeHotkey(v.name)) {
          words.push(`hotkey:${this.getPrimitiveTypeHotkey(v.name)}`);
        }

        m[v.type].push(words.join(' '));
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

  attrs: Attribute[];
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
    emptyCallingConvention: this.emptyCallingConventionError,
    emptyMember: this.emptyMemberError,
    invalidArguments: this.invalidArgumentsError,
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
    if (this.viewContext === ViewContext.Code) {
      command.name = trim(formatNativeName(value));
    } else {
      command.name = trim(this.defaultCommandNameFormatter(value));
    }
    this.updateErrors();
  }

  onOpcodeChange(command: Command, value: string) {
    command.id = trim(formatOpcode(value));
    this.updateErrors();
  }

  onClassChange(command: Command, value: string) {
    if (this.viewContext === ViewContext.Script) {
      command.class = capitalizeFirst(value);
    } else {
      command.class = value;
    }
    this.updateErrors();
  }

  onMemberChange(command: Command, value: string) {
    if (this.viewContext === ViewContext.Script) {
      command.member = capitalizeFirst(value);
    } else {
      command.member = value;
    }
    this.updateErrors();
  }

  onOperationChange(command: Command, operator: string) {
    command.operator = operator;
    this.updateErrors();
  }

  onCcChange(command: Command, cc: Command['cc']) {
    command.cc = cc;

    // prefill the fields for thiscall methods
    if (this.viewContext === ViewContext.Code) {
      if (command.cc === 'thiscall') {
        if (command.class) {
          if (!command.input || !command.input.length) {
            command.input = [
              {
                name: SELF,
                type: command.class,
                source: DEFAULT_INPUT_SOURCE,
              },
            ];
            command.num_params++;
          }
        }
      }
    }
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

  getPrimitiveTypeHotkey(name: string) {
    switch (name) {
      case PrimitiveType.int:
      case PrimitiveType.float:
      case PrimitiveType.string:
      case PrimitiveType.arguments:
      case PrimitiveType.boolean:
      case PrimitiveType.label:
      case PrimitiveType.model_any:
      case PrimitiveType.gxt_key:
      case PrimitiveType.gxt_key:
      case PrimitiveType.zone_key:
        return name[0];
      default:
        return undefined;
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
    if (this.viewContext === ViewContext.Code) {
      return SourceType.any;
    }
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
      if (this.viewContext === ViewContext.Code) {
        command.attrs.is_constructor && this.onIsConstructorToggle(command);
        command.attrs.is_destructor && this.onIsDestructorToggle(command);
        command.attrs.is_condition && this.onIsConditionToggle(command);
      }
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
      const suggestion = this.command.class || this.suggestedClassName;
      return this.paramTypes.includes(`class ${suggestion}`) ? suggestion : '';
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
    const last = (list: string[]) => list && list[list.length - 1];
    const cmp = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

    let lastWord = last(split(name));

    if (typeof lastWord === 'string') {
      if (cmp(lastWord, 'vehicle')) {
        lastWord = 'Car';
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
      if (this.viewContext === ViewContext.Script) {
        return DEFAULT_OUTPUT_SOURCE;
      }
    }
    return '';
  }

  get suggestedOpcodeId(): string {
    return normalizeId(this.command.id!);
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
      if (this.viewContext === ViewContext.Script) {
        event.container.data[event.currentIndex].source = newSource;
      }
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

  addOutput() {
    this.command.output ??= [];
    this.command.output.push({
      name: '',
      type: PrimitiveType.any,
      source: DEFAULT_OUTPUT_SOURCE,
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

  copyFromCommand(game: Game) {
    this.copyFrom.emit(game);
  }

  pasteToken(token: string) {
    const snippet = this.snippetText.nativeElement;
    const start = snippet.selectionStart;
    const end = snippet.selectionEnd;
    const text = snippet.value;
    snippet.value = `${text.slice(0, start)}${token}${text.slice(end)}`;
    snippet.focus();
    snippet.selectionStart = start + token.length;
    snippet.selectionEnd = start + token.length;

    return false;
  }

  onIsConstructorToggle(command: Command) {
    if (!command.cc) {
      command.cc = 'thiscall';
    }
    if (command.class) {
      if (!command.output || !command.output.length) {
        command.output = [
          {
            name: 'handle',
            type: command.class || this.suggestedClassName,
            source: DEFAULT_INPUT_SOURCE,
          },
        ];
        command.num_params++;
      }
      if (!command.input || !command.input.length) {
        command.input = [
          {
            name: SELF,
            type: command.class,
            source: DEFAULT_INPUT_SOURCE,
          },
        ];
        command.num_params++;
      }

      if (!command.short_desc) {
        command.short_desc = `Initializes a ${command.class} struct`;
      }
    }

    if (!command.member) {
      command.member = 'ctor';
    }
  }

  onIsDestructorToggle(command: Command) {
    if (!command.cc) {
      command.cc = 'thiscall';
    }
    if (command.class) {
      if (!command.input || !command.input.length) {
        command.input = [
          {
            name: SELF,
            type: command.class,
            source: DEFAULT_INPUT_SOURCE,
          },
        ];
        command.num_params++;
      }

      if (!command.short_desc) {
        command.short_desc = `Deinitializes the ${command.class} struct`;
      }
    }

    if (!command.member) {
      command.member = 'dtor';
    }
  }

  onIsConditionToggle(command: Command) {
    if (!command.output || !command.output.length) {
      command.output = [
        {
          name: 'state',
          type: 'bool',
          source: DEFAULT_INPUT_SOURCE,
        },
      ];
      command.num_params++;
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
    this.errors.invalidOutputSource =
      this.viewContext === ViewContext.Script &&
      doesOutputHaveInvalidSource(this.command);
  }

  private emptyCallingConventionError() {
    this.errors.emptyCallingConvention =
      this.viewContext === ViewContext.Code &&
      doesCommandHaveEmptyCallingConvention(this.command);
  }

  private emptyMemberError() {
    this.errors.emptyMember =
      (this.viewContext === ViewContext.Code &&
        doesNativeFunctionHaveNoName(this.command)) ||
      (this.viewContext === ViewContext.Script &&
        doesScriptCommandHaveEmptyMember(this.command));
  }

  private invalidArgumentsError() {
    this.errors.invalidArguments = doesCommandHaveInvalidArguments(
      this.command,
      this.game
    );
  }
}

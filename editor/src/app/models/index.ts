export interface Attr {
  is_branch: boolean;
  is_segment: boolean;
  is_keyword: boolean;
  is_condition: boolean;
  is_nop: boolean;
  is_unsupported: boolean;
  is_constructor: boolean;
  is_destructor: boolean;
  is_static: boolean;
  is_overload: boolean;
  is_variadic: boolean;
}

export type Attribute = keyof Attr;

export enum PrimitiveType {
  any = 'any',
  arguments = 'arguments',
  boolean = 'bool',
  float = 'float',
  int = 'int',
  label = 'label',
  string = 'string',
  string128 = 'string128',
  gxt_key = 'gxt_key',
  zone_key = 'zone_key',
  model_any = 'model_any',
  model_char = 'model_char',
  model_object = 'model_object',
  model_vehicle = 'model_vehicle',
  int_script_id = 'script_id',
}

export enum SourceType {
  any = 'any',
  var_any = 'var_any',
  var_global = 'var_global',
  var_local = 'var_local',
  literal = 'literal',
}

export const CommandAttributes: Attribute[] = [
  'is_branch',
  'is_condition',
  'is_constructor',
  'is_destructor',
  'is_keyword',
  'is_nop',
  'is_overload',
  'is_segment',
  'is_static',
  'is_unsupported',
  'is_variadic',
];

export enum Platform {
  Any = 'any',
  PC = 'pc',
  Console = 'console',
  Mobile = 'mobile',
}

export enum Version {
  Any = 'any',
  _10 = '1.0',
  _11 = '1.1',
  _JP = '1.1 [JP]',
  _20 = '2.0',
  _30 = '3.0',
  _unreal10 = '1.0 [DE]',
}

export interface Param {
  type: ParamType['name'];
  name: string;
  source: SourceType;
}

export interface Command {
  id: string;
  name?: string; // can be undefined in delete flow
  attrs?: Partial<Attr>;
  num_params: number;
  input?: Param[];
  output?: Param[];
  class?: string;
  member?: string;
  short_desc?: string;
  platforms?: Platform[];
  versions?: Version[];
}

export interface Extension {
  name: string;
  commands: Command[];
}

export interface ExtensionSnippets {
  [extensionName: string]: { [opcode: string]: string };
}

export interface Enums {
  [enumName: string]: Record<string, string | number | null>;
}

export interface EnumRaw {
  name: string;
  fields: Array<[string, string | number | null]>;
  isNew: boolean;
}

export const KNOWN_LANGUAGES = ['en', 'ru', 'cn'];

export enum Game {
  GTA3 = 'gta3',
  gta3_mobile = 'gta3_mobile',
  gta3_unreal = 'gta3_unreal',
  VC = 'vc',
  vc_mobile = 'vc_mobile',
  vc_unreal = 'vc_unreal',
  SA = 'sa',
  sa_mobile = 'sa_mobile',
  sa_unreal = 'sa_unreal',
}

export const BaseGame = {
  [Game.GTA3]: Game.GTA3,
  [Game.VC]: Game.VC,
  [Game.SA]: Game.SA,
};

export const GameIcon: Record<Game, string> = {
  [Game.GTA3]: 'assets/gta3.png',
  [Game.gta3_mobile]: 'assets/gta3.png',
  [Game.gta3_unreal]: 'assets/gta3.png',
  [Game.VC]: 'assets/vc.png',
  [Game.vc_mobile]: 'assets/vc.png',
  [Game.vc_unreal]: 'assets/vc.png',
  [Game.SA]: 'assets/sa.png',
  [Game.sa_mobile]: 'assets/sa.png',
  [Game.sa_unreal]: 'assets/sa.png',
};

export const GameClassesAssets: Record<Game, string> = {
  [Game.GTA3]: 'assets/gta3_classic/classes.db',
  [Game.gta3_mobile]: 'assets/gta3_mobile/classes.db',
  [Game.gta3_unreal]: 'assets/gta3_unreal/classes.db',
  [Game.VC]: 'assets/vc_classic/classes.db',
  [Game.vc_mobile]: 'assets/vc_mobile/classes.db',
  [Game.vc_unreal]: 'assets/vc_unreal/classes.db',
  [Game.SA]: 'assets/sa_classic/classes.db',
  [Game.sa_mobile]: 'assets/sa_mobile/classes.db',
  [Game.sa_unreal]: 'assets/sa_unreal/classes.db',
};

export const GameEnumsAssets: Record<Game, string> = {
  [Game.GTA3]: 'assets/gta3_classic/enums.txt',
  [Game.gta3_mobile]: 'assets/gta3_mobile/enums.txt',
  [Game.gta3_unreal]: 'assets/gta3_unreal/enums.txt',
  [Game.VC]: 'assets/vc_classic/enums.txt',
  [Game.vc_mobile]: 'assets/vc_mobile/enums.txt',
  [Game.vc_unreal]: 'assets/vc_unreal/enums.txt',
  [Game.SA]: 'assets/sa_classic/enums.txt',
  [Game.sa_mobile]: 'assets/sa_mobile/enums.txt',
  [Game.sa_unreal]: 'assets/sa_unreal/enums.txt',
};

export const GameKeywordsAssets: Record<Game, string> = {
  [Game.GTA3]: 'assets/gta3_classic/keywords.txt',
  [Game.gta3_mobile]: 'assets/gta3_mobile/keywords.txt',
  [Game.gta3_unreal]: 'assets/gta3_unreal/keywords.txt',
  [Game.VC]: 'assets/vc_classic/keywords.txt',
  [Game.vc_unreal]: 'assets/vc_unreal/keywords.txt',
  [Game.vc_mobile]: 'assets/vc_mobile/keywords.txt',
  [Game.SA]: 'assets/sa_classic/keywords.txt',
  [Game.sa_mobile]: 'assets/sa_mobile/keywords.txt',
  [Game.sa_unreal]: 'assets/sa_unreal/keywords.txt',
};

export const GameLibrary: Record<Game, string> = {
  [Game.GTA3]: 'gta3/gta3.json',
  [Game.gta3_mobile]: 'gta3/gta3.json',
  [Game.gta3_unreal]: 'gta3/gta3.json',
  [Game.VC]: 'vc/vc.json',
  [Game.vc_mobile]: 'vc/vc.json',
  [Game.vc_unreal]: 'vc/vc.json',
  [Game.SA]: 'sa/sa.json',
  [Game.sa_mobile]: 'sa/sa.json',
  [Game.sa_unreal]: 'sa/sa.json',
};

export const GameVersion: Record<Game, string> = {
  [Game.GTA3]: 'gta3/version.txt',
  [Game.gta3_mobile]: 'gta3/version.txt',
  [Game.gta3_unreal]: 'gta3/version.txt',
  [Game.VC]: 'vc/version.txt',
  [Game.vc_mobile]: 'vc/version.txt',
  [Game.vc_unreal]: 'vc/version.txt',
  [Game.SA]: 'sa/version.txt',
  [Game.sa_mobile]: 'sa/version.txt',
  [Game.sa_unreal]: 'sa/version.txt',
};

export const GameSnippets: Record<Game, string> = {
  [Game.GTA3]: 'gta3/snippets.json',
  [Game.gta3_mobile]: 'gta3/snippets.json',
  [Game.gta3_unreal]: 'gta3/snippets.json',
  [Game.VC]: 'vc/snippets.json',
  [Game.vc_mobile]: 'vc/snippets.json',
  [Game.vc_unreal]: 'vc/snippets.json',
  [Game.SA]: 'sa/snippets.json',
  [Game.sa_mobile]: 'sa/snippets.json',
  [Game.sa_unreal]: 'sa/snippets.json',
};

export const GameEnums: Record<Game, string> = {
  [Game.GTA3]: 'gta3/enums.json',
  [Game.gta3_mobile]: 'gta3/enums.json',
  [Game.gta3_unreal]: 'gta3/enums.json',
  [Game.VC]: 'vc/enums.json',
  [Game.vc_mobile]: 'vc/enums.json',
  [Game.vc_unreal]: 'vc/enums.json',
  [Game.SA]: 'sa/enums.json',
  [Game.sa_mobile]: 'sa/enums.json',
  [Game.sa_unreal]: 'sa/enums.json',
};

export const GameTitle: Record<Game, string> = {
  [Game.GTA3]: 'GTA III (Classic)',
  [Game.gta3_mobile]: 'GTA III (Mobile)',
  [Game.gta3_unreal]: 'GTA III (The Definitive Edition)',
  [Game.VC]: 'Vice City (Classic)',
  [Game.vc_mobile]: 'Vice City (Mobile)',
  [Game.vc_unreal]: 'Vice City (The Definitive Edition)',
  [Game.SA]: 'San Andreas (Classic)',
  [Game.sa_mobile]: 'San Andreas (Mobile)',
  [Game.sa_unreal]: 'San Andreas (The Definitive Edition)',
};

export const GameTitleSimple: Record<Game, string> = {
  [Game.GTA3]: 'GTA III',
  [Game.gta3_mobile]: 'GTA III',
  [Game.gta3_unreal]: 'GTA III',
  [Game.VC]: 'Vice City',
  [Game.vc_mobile]: 'Vice City',
  [Game.vc_unreal]: 'Vice City',
  [Game.SA]: 'San Andreas',
  [Game.sa_mobile]: 'San Andreas',
  [Game.sa_unreal]: 'San Andreas',
};

export const GamePlatforms: Record<Game, Platform[]> = {
  [Game.GTA3]: [Platform.PC],
  [Game.gta3_mobile]: [Platform.Console, Platform.Mobile],
  [Game.gta3_unreal]: [Platform.PC],
  [Game.VC]: [Platform.PC],
  [Game.vc_mobile]: [Platform.Console, Platform.Mobile],
  [Game.vc_unreal]: [Platform.PC],
  [Game.SA]: [Platform.PC],
  [Game.sa_mobile]: [Platform.Console, Platform.Mobile],
  [Game.sa_unreal]: [Platform.PC],
};

export const GameVersions: Record<Game, Version[]> = {
  [Game.GTA3]: [Version._10, Version._11],
  [Game.gta3_mobile]: [Version._10],
  [Game.gta3_unreal]: [Version._unreal10],
  [Game.VC]: [Version._10, Version._JP],
  [Game.vc_mobile]: [Version._10],
  [Game.vc_unreal]: [Version._unreal10],
  [Game.SA]: [Version._10],
  [Game.sa_mobile]: [Version._10, Version._30],
  [Game.sa_unreal]: [Version._unreal10],
};

export const DEFAULT_EXTENSION = 'default';

export enum ViewMode {
  None = 'None',
  EditCommand = 'EditCommand',
  ViewCommand = 'ViewCommand',
  ViewClass = 'ViewClass',
  ViewEnum = 'ViewEnum',
  EditEnum = 'EditEnum',
  ViewAllClasses = 'ViewAllClasses',
  ViewAllEnums = 'ViewAllEnums',
  ViewDecisionTree = 'ViewDecisionTree',
}

export type Modifier = 'except' | 'only';

export type SupportInfo = Record<string, Record<string, GameSupportInfo[]>>;

export interface ClassMeta {
  name: string;
  desc: string;
  constructable: boolean;
  extends?: string;
}

export interface GameSupportInfo {
  game: Game;
  level: SupportLevel;
}

export enum SupportLevel {
  DoesNotExist = -2,
  Unsupported = -1,
  Nop = 0,
  Supported = 1,
  SupportedDiffParams = 2,
}

export interface Entity {
  type: 'static' | 'dynamic'; // dynamic can be constructed using an opcode
  name: string;
}

export interface Primitive {
  type: 'primitive';
  name: PrimitiveType;
}

export interface Enum {
  type: 'enum';
  name: string;
}

export type ParamType = Entity | Primitive | Enum;

export interface LoadExtensionsResponse {
  meta: {
    last_update: number;
    version: string;
    url: string;
  };
  extensions: Extension[];
  classes: ClassMeta[];
}

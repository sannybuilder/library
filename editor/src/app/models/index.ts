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
  name: string;
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

export const KNOWN_LANGUAGES = ['en', 'ru', 'cn', 'bn', 'es', 'fr'];

export enum Game {
  gta3 = 'gta3',
  vc = 'vc',
  sa = 'sa',
  gta3_mobile = 'gta3_mobile',
  vc_mobile = 'vc_mobile',
  sa_mobile = 'sa_mobile',
  gta3_unreal = 'gta3_unreal',
  vc_unreal = 'vc_unreal',
  sa_unreal = 'sa_unreal',
  unknown_x86 = 'unknown_x86',
  unknown_x64 = 'unknown_x64',
  gta_iv = 'gta_iv',
}

const r = <T>(cb: (game: Game) => T) =>
  Object.values(Game).reduce((m, v) => {
    m[v] = cb(v);
    return m;
  }, {} as Record<Game, T>);

export const GameClassesAssets: Partial<Record<Game, string>> = {
  [Game.gta3]: 'assets/gta3/classes.db',
  [Game.vc]: 'assets/vc/classes.db',
  [Game.sa]: 'assets/sa/classes.db',
  [Game.gta3_mobile]: 'assets/gta3_mobile/classes.db',
  [Game.vc_mobile]: 'assets/vc_mobile/classes.db',
  [Game.sa_mobile]: 'assets/sa_mobile/classes.db',
  [Game.gta3_unreal]: 'assets/gta3_unreal/classes.db',
  [Game.vc_unreal]: 'assets/vc_unreal/classes.db',
  [Game.sa_unreal]: 'assets/sa_unreal/classes.db',
};

export const GameEnumsAssets: Partial<Record<Game, string>> = {
  [Game.gta3]: 'assets/gta3/enums.txt',
  [Game.vc]: 'assets/vc/enums.txt',
  [Game.sa]: 'assets/sa/enums.txt',
  [Game.gta3_mobile]: 'assets/gta3_mobile/enums.txt',
  [Game.vc_mobile]: 'assets/vc_mobile/enums.txt',
  [Game.sa_mobile]: 'assets/sa_mobile/enums.txt',
  [Game.gta3_unreal]: 'assets/gta3_unreal/enums.txt',
  [Game.vc_unreal]: 'assets/vc_unreal/enums.txt',
  [Game.sa_unreal]: 'assets/sa_unreal/enums.txt',
};

export const GameKeywordsAssets: Partial<Record<Game, string>> = {
  [Game.gta3]: 'assets/gta3/keywords.txt',
  [Game.vc]: 'assets/vc/keywords.txt',
  [Game.sa]: 'assets/sa/keywords.txt',
  [Game.gta3_mobile]: 'assets/gta3_mobile/keywords.txt',
  [Game.vc_mobile]: 'assets/vc_mobile/keywords.txt',
  [Game.sa_mobile]: 'assets/sa_mobile/keywords.txt',
  [Game.gta3_unreal]: 'assets/gta3_unreal/keywords.txt',
  [Game.vc_unreal]: 'assets/vc_unreal/keywords.txt',
  [Game.sa_unreal]: 'assets/sa_unreal/keywords.txt',
};

export const GameLibrary: Record<Game, string> = r(
  (game) => `${game}/${game}.json`
);

export const GameVersion: Record<Game, string> = r(
  (game) => `${game}/version.txt`
);

export const GameSnippets: Record<Game, string> = {
  [Game.gta3]: 'gta3/snippets.json',
  [Game.vc]: 'vc/snippets.json',
  [Game.sa]: 'sa/snippets.json',
  [Game.gta3_mobile]: 'gta3/snippets.json',
  [Game.vc_mobile]: 'vc/snippets.json',
  [Game.sa_mobile]: 'sa/snippets.json',
  [Game.gta3_unreal]: 'gta3/snippets.json',
  [Game.vc_unreal]: 'vc/snippets.json',
  [Game.sa_unreal]: 'sa/snippets.json',
  [Game.unknown_x86]: 'unknown_x86/snippets.json',
  [Game.unknown_x64]: 'unknown_x86/snippets.json',
  [Game.gta_iv]: 'gta_iv/snippets.json',
};

export const GameEnums: Record<Game, string> = r(
  (game) => `${game}/enums.json`
);

export const GameEnumsJsAssets: Record<Game, string> = r(
  (game) => `assets/${game}/enums.js`
);

export const GameTitle: Record<Game, string> = {
  [Game.gta3]: 'GTA III (Classic)',
  [Game.vc]: 'Vice City (Classic)',
  [Game.sa]: 'San Andreas (Classic)',
  [Game.gta3_mobile]: 'GTA III (Mobile)',
  [Game.vc_mobile]: 'Vice City (Mobile)',
  [Game.sa_mobile]: 'San Andreas (Mobile)',
  [Game.gta3_unreal]: 'GTA III (The Definitive Edition)',
  [Game.vc_unreal]: 'Vice City (The Definitive Edition)',
  [Game.sa_unreal]: 'San Andreas (The Definitive Edition)',
  [Game.unknown_x86]: 'Unknown (32-bit)',
  [Game.unknown_x64]: 'Unknown (64-bit)',
  [Game.gta_iv]: 'GTA IV',
};

export const GameTitleSimple: Record<Game, string> = {
  ...r(() => 'Other'),
  [Game.gta3]: 'GTA III',
  [Game.vc]: 'Vice City',
  [Game.sa]: 'San Andreas',
  [Game.gta3_mobile]: 'GTA III',
  [Game.vc_mobile]: 'Vice City',
  [Game.sa_mobile]: 'San Andreas',
  [Game.gta3_unreal]: 'GTA III',
  [Game.vc_unreal]: 'Vice City',
  [Game.sa_unreal]: 'San Andreas',
};

export const GamePlatforms: Record<Game, Platform[]> = {
  ...r(() => [Platform.PC]),
  [Game.gta3]: [Platform.PC],
  [Game.vc]: [Platform.PC],
  [Game.sa]: [Platform.PC],
  [Game.gta3_mobile]: [Platform.Console, Platform.Mobile],
  [Game.vc_mobile]: [Platform.Console, Platform.Mobile],
  [Game.sa_mobile]: [Platform.Console, Platform.Mobile],
  [Game.gta3_unreal]: [Platform.PC],
  [Game.vc_unreal]: [Platform.PC],
  [Game.sa_unreal]: [Platform.PC],
};

export const GameVersions: Record<Game, Version[]> = {
  ...r(() => [Version._10]),
  [Game.gta3]: [Version._10, Version._11],
  [Game.vc]: [Version._10, Version._JP],
  [Game.sa]: [Version._10],
  [Game.gta3_mobile]: [Version._10],
  [Game.vc_mobile]: [Version._10],
  [Game.sa_mobile]: [Version._10, Version._30],
  [Game.gta3_unreal]: [Version._unreal10],
  [Game.vc_unreal]: [Version._unreal10],
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
  ViewGenerateJson = 'ViewGenerateJson',
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
  extension?: string; // only when command exists
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

export interface GenerateJsonModel {
  selectedExtensions: string[];
  fileName: string;
}
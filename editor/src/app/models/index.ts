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
}

export enum ParamType {
  any = 'any',
  label = 'label',
  arguments = 'arguments',
  int = 'int',
  float = 'float',
}

export interface Param {
  type: ParamType;
  name: String;
}

export interface Command {
  id: string;
  name: string;
  attrs: Attr;
  num_params: number;
  input?: Param[];
  output?: Param[];
  class?: string;
  member?: string;
  short_desc: string;
}

export interface Extension {
  name: string;
  commands: Command[];
}

export enum Game {
  GTA3 = 'gta3',
  VC = 'vc',
}

export const DEFAULT_EXTENSION = 'default';

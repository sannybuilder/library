export interface ScriptFile {
  base: number;
  symbols: string[];
  refs: number[];
  lines: Array<number | string>[];
}

export interface ScmTreeNode {
  label: string;
  path?: string;
  children?: ScmTreeNode[];
}

export interface ScmMapFileEntry {
  name: string;
  pid: number;
  path: string;
}

export interface ScmMap {
  version: number;
  base: string;
  groups: string[];
  files: ScmMapFileEntry[];
  xrefs: Record<string, string[]>;
}

export interface ScmXrefItem {
  source: string;
  targetName?: string;
  targetPath?: string;
  lineIndex?: number;
  lineNumber?: number;
  fragment?: string;
}

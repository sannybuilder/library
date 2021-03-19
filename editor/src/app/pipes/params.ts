import { Param, SourceType } from '../models';

export function stringifySource(source: SourceType) {
  switch (source) {
    case SourceType.any:
      return '';
    case SourceType.var_any:
      return 'var';
    case SourceType.var_global:
      return 'gvar';
    case SourceType.var_local:
      return 'lvar';
    case SourceType.literal:
      return 'literal';
  }
}

export function stringifyParam(p: Param) {
  return [[stringifySource(p.source), p.name].filter(Boolean).join(' '), p.type]
    .filter(Boolean)
    .join(': ');
}

export function stringifyParamBrackets(p: Param) {
  return `[${stringifyParam(p)}]`;
}

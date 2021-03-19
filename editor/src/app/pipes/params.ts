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
  }
}

export function stringifyParam(p: Param) {
  return `${[stringifySource(p.source), p.name].filter(Boolean).join(' ')}: ${
    p.type
  }`;
}

export function stringifyParamBrackets(p: Param) {
  return `[${stringifyParam(p)}]`;
}

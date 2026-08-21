import { uniqBy } from 'lodash';
import { KeyValueEntry } from '../components/scm';
import { Game, GameScmVersions, ScmVersionConfig } from '../models';

export function getScmVersionConfig(game: Game): ScmVersionConfig | undefined {
  return GameScmVersions[game];
}

export function getScmDefaultVersion(game: Game): string | undefined {
  return GameScmVersions[game]?.versions[0]?.id;
}

export function getScmVersionLabel(game: Game, id: string): string {
  const version = GameScmVersions[game]?.versions.find((v) => v.id === id);
  return version?.label ?? id;
}

// Unique cache scope for a game + optional SCM version, e.g. 'lcs' or 'lcs/psp'.
export function getScmScopeKey(game: Game, version?: string): string {
  return version ? `${game}/${version}` : game;
}

// Base folder the SCM overlays/map are loaded from, e.g. '/assets/lcs/scm/psp'.
export function getScmAssetBase(game: Game, version?: string): string {
  return version ? `/assets/${game}/scm/${version}` : `/assets/${game}/scm`;
}

// Interpolate the configured SCM base template (see Config.scmBase).
// e.g. template '/assets/{game}/scm/{version}' + (lcs, psp) -> '/assets/lcs/scm/psp'
export function getScmBase(
  template: string,
  game: Game,
  version: string,
): string {
  return template
    .replace(/\{game\}/g, game)
    .replace(/\{version\}/g, version);
}

export function normalizeScmPath(path: string): string {
  return path.replace(/\\/g, '/').replace(/\.json$/i, '');
}

export function toLineNumber(
  lineIndex: number | undefined,
): number | undefined {
  if (typeof lineIndex !== 'number' || lineIndex < 0) {
    return undefined;
  }

  return lineIndex + 1;
}

export function getFragment(lineIndex: number | undefined): string | undefined {
  const lineNumber = toLineNumber(lineIndex);
  if (typeof lineNumber === 'number') {
    return `L${lineNumber}`;
  }

  return undefined;
}

export function getRoutePath(game: string, path: string, version?: string) {
  const parts = [`/${game}/scm`];
  if (version) {
    parts.push(version);
  }
  return [...parts, ...path.split('/').filter(Boolean)];
}

export function toRefKey(offset: number): string {
  return `ref.${offset.toString()}`;
}

export function extractRefOffset(ref: string): string {
  return ref.slice('ref.'.length);
}

export function sortRefs(refs: KeyValueEntry[]): KeyValueEntry[] {
  let sorted = refs
    .filter(({ key }) => key.startsWith('ref.'))
    .sort((a, b) => getOffset(a.key) - getOffset(b.key));

  return uniqBy(sorted, 'key');
}

export function sortVariables(variables: KeyValueEntry[]): KeyValueEntry[] {
  let sorted = variables
    .filter(({ key }) => key.startsWith('g.') || key.startsWith('l.'))
    .sort((a, b) => getOffset(a.key) - getOffset(b.key));

  return uniqBy(sorted, 'key');
}

function getOffset(value: string): number {
  const parts = value.split('.');
  return Number.parseInt(parts.at(-1) ?? '0', 10);
}

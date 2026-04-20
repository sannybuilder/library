import { uniqBy } from 'lodash';
import { KeyValueEntry } from '../components/scm';

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

export function getRoutePath(game: string, path: string) {
  return [`/${game}/scm`, ...path.split('/').filter(Boolean)];
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

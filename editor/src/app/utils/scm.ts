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
  return [`/${game}/scm/files`, ...path.split('/').filter(Boolean)];
}

export function toRefKey(offset: number): string {
  return `ref.${offset.toString()}`;
}
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

export function sortRefs(refs: Record<string, string>): Record<string, string> {
  return sortBy(refs, 'ref.');
}

export function sortVariables(
  variables: Record<string, string>
): Record<string, string> {
  return sortBy(variables, 'g.');
}

function sortBy(list: Record<string, string>, prefix: string) {
  return Object.fromEntries(
    Object.entries(list)
      .filter(([key]) => key.startsWith(prefix))
      .sort((a, b) => toNumber(a[0], prefix) - toNumber(b[0], prefix)),
  );
}

function toNumber(value: string, prefix: string): number {
  return Number.parseInt(value.slice(prefix.length), 10);
}

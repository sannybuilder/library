export function opcodify(value: string): string {
  return value.padStart(4, '0').toUpperCase().slice(0, 4);
}

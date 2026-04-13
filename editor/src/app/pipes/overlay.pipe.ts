import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'overlay',
  standalone: false,
})
export class OverlayPipe implements PipeTransform {
  transform(
    arg: number | string | null | undefined,
    symbols: string[] = [],
    overlay: Record<string, string> = {},
  ): string {
    if (arg === undefined || arg === null) {
      return '';
    }

    let resolved = arg;
    if (typeof arg === 'string' && arg.startsWith('$')) {
      const refIndex = parseInt(arg.slice(1), 10);
      if (!isNaN(refIndex) && refIndex >= 0 && refIndex < symbols.length) {
        resolved = symbols[refIndex];
      }
    }

    const value = resolved.toString();
    return overlay[value] ?? this.getDefaultOverlay(value);
  }

  getDefaultOverlay(value: string): string {
    if (value.startsWith('g.')) {
      let index = value.split('.')[1];
      return `$${index}`;
    }
    if (value.startsWith('ref.')) {
      let index = value.split('.')[1];
      return `@label_${index}`;
    }
    if (value.startsWith('l.')) {
      let index = value.split('.')[1];
      return `${index}@`;
    }
    return value;
  }
}

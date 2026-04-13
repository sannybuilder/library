import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'labelOverlay',
  standalone: false,
})
export class LabelOverlayPipe implements PipeTransform {
  transform(
    lineOffset: number | string | null | undefined,
    base = 0,
    overlay: Record<string, string> = {}
  ): string {
    if (lineOffset === undefined || lineOffset === null) {
      return '';
    }

    const ref = Number(lineOffset) + base;
    const key = `ref.${ref}`;
    const label = overlay[key];

    return label ? `:${label}` : `:label_${ref}`;
  }
}

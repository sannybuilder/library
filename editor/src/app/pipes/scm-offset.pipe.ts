import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scmOffset',
  standalone: false,
})
export class ScmOffsetPipe implements PipeTransform {
  transform(lineOffset: number | string | null | undefined, base = 0): string {
    if (lineOffset === undefined || lineOffset === null) {
      return '';
    }

    return `{${Number(lineOffset) + base}}`;
  }
}

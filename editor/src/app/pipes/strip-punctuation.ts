import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stripPunctuation',
    standalone: false
})
export class StripPunctuationPipe implements PipeTransform {
  transform(value: string): string {
    const trimmed = value.trim();
    if (trimmed.startsWith(',')) {
      return trimmed.slice(1);
    }
    return value;
  }
}

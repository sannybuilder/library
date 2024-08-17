import { Pipe, PipeTransform } from '@angular/core';
import Prism from 'prismjs';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(input: string): string {
    return Prism.highlight(input, Prism.languages.sb, 'sb');
  }
}

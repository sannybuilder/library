import { Pipe, PipeTransform } from '@angular/core';
import md from 'markdown-it';

@Pipe({
  name: 'markdown',
  standalone: false,
})
export class MarkdownPipe implements PipeTransform {
  transform(content: string): string {
    if (content) {
      return md({ html: true }).render(content);
    }
    return '';
  }
}

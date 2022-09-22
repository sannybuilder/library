import { Pipe, PipeTransform } from '@angular/core';
import * as md from 'markdown-it';

@Pipe({
  name: 'markdown',
})
export class MarkdownPipe implements PipeTransform {
  transform(content: string): string {
    if (content) {
      return md().render(content);
    }
    return '';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'snippetify' })
export class SnippetifyPipe implements PipeTransform {
  constructor() {}

  transform(content: string) {
    return `${'<%= decl %>'}\n${content}`;
  }
}

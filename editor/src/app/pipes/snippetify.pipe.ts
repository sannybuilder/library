import { Pipe, PipeTransform } from '@angular/core';
import { ViewContext } from '../models';

@Pipe({ name: 'snippetify' })
export class SnippetifyPipe implements PipeTransform {
  constructor() {}

  transform(content: string, viewContext: ViewContext) {
    if (viewContext === ViewContext.Code) {
      return `${'<%= decl %>'}\n${content}`;
    }
    return content;
  }
}

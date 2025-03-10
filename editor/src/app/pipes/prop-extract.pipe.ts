import { Pipe, PipeTransform } from '@angular/core';
import { SEARCH_OPTIONS } from '../utils';

@Pipe({
    name: 'propExtract',
    standalone: false
})
export class PropExtractPipe implements PipeTransform {
  transform(command: any, propKey: string) {
    const content =
      command[SEARCH_OPTIONS.highlightKey]?.[propKey] ??
      command[propKey] ??
      '';
    return content;
  }
}

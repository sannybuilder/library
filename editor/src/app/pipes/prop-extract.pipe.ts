import { Pipe, PipeTransform } from '@angular/core';
import { FUSEJS_OPTIONS } from '../utils';

@Pipe({ name: 'propExtract' })
export class PropExtractPipe implements PipeTransform {
  transform(command: any, propKey: string) {
    const content =
      command[FUSEJS_OPTIONS.fusejsHighlightKey]?.[propKey] ??
      command[propKey] ??
      '';
    return content;
  }
}

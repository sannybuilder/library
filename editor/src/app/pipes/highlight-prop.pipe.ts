import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FUSEJS_OPTIONS } from '../utils';

@Pipe({ name: 'hlProp' })
export class HlPropPipe implements PipeTransform {
  constructor(private _s: DomSanitizer) {}

  transform(command: any, propKey: string) {
    return this._s.bypassSecurityTrustHtml(
      command[FUSEJS_OPTIONS.fusejsHighlightKey]?.[propKey] ?? command[propKey]
    );
  }
}

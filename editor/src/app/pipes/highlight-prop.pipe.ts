import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FUSEJS_OPTIONS, linkify } from '../utils';

@Pipe({ name: 'hlProp' })
export class HlPropPipe implements PipeTransform {
  constructor(private _s: DomSanitizer) {}

  transform(command: any, propKey: string) {
    const content =
      command[FUSEJS_OPTIONS.fusejsHighlightKey]?.[propKey] ??
      command[propKey] ??
      '';

    return this._s.bypassSecurityTrustHtml(linkify(content));
  }
}

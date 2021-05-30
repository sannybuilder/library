import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { linkify } from '../utils';

@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  constructor(private _s: DomSanitizer) {}

  transform(value: string) {
    return this._s.bypassSecurityTrustHtml(linkify(value));
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'sanitize' })
export class SanitizePipe implements PipeTransform {
  constructor(private _s: DomSanitizer) {}

  transform(content: string) {
    return this._s.bypassSecurityTrustHtml(content);
  }
}

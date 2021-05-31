import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models';

@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  transform(content: string, game: Game, extension: string) {
    if (!content) {
      return content;
    }

    return content.replace(
      /0[\dA-Fa-f][\dA-Fa-f][\dA-Fa-f]/g,
      `<a href="#/${game}/${extension}/$&">$&</a>`
    );
  }
}

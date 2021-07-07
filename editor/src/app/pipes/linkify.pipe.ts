import { Pipe, PipeTransform } from '@angular/core';
import { Command, Game } from '../models';
import { commandParams } from '../utils';

@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  transform(content: string, game: Game, extension: string, command: Command) {
    if (!content) {
      return content;
    }

    const links = content.replace(
      /0[\dA-Fa-f][\dA-Fa-f][\dA-Fa-f]/g,
      `<a href="#/${game}/${extension}/$&">$&</a>`
    );

    const paramNames = commandParams(command).map((p) => p.name);
    return paramNames.reduce((m, v) => {
      if (!v) {
        return m;
      }
      const re = new RegExp(`\\b${v}\\b`, 'gi');
      return m.replace(re, `<span class="identifier">$&</span>`);
    }, links);
  }
}

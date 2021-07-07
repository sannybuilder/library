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

    return commandParams(command).reduce((m, p) => {
      const { name } = p;
      if (!name) {
        return m;
      }
      const needle = name === 'self' ? p.type : name;

      const re = new RegExp(`\\b${needle}\\b`, 'i');
      return m.replace(re, `<span class="identifier">$&</span>`);
    }, links);
  }
}

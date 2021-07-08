import { Pipe, PipeTransform } from '@angular/core';
import { Command, Game } from '../models';
import { commandParams } from '../utils';
import { words } from 'lodash';

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
    const aliases = [
      ['car', 'vehicle'],
      ['ped', 'character', 'char'],
      ['number', 'num'],
    ];

    return commandParams(command).reduce((m, p) => {
      const { name } = p;

      let needle = name === 'self' || !name ? p.type : words(name).join(' ');

      aliases.forEach((alias) => {
        if (alias.includes(needle.toLowerCase())) {
          needle = alias.join('|');
        }
      });

      const re = new RegExp(`\\b${needle}\\b`, 'i');
      return m.replace(re, `<span class="identifier">$&</span>`);
    }, links);
  }
}

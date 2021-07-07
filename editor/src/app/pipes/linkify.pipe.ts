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
    const carAliases = ['car', 'vehicle'];
    const charAliases = ['ped', 'character', 'char'];

    return commandParams(command).reduce((m, p) => {
      const { name } = p;
      if (!name) {
        return m;
      }
      let needle = name === 'self' ? p.type : name;

      if (carAliases.includes(needle.toLowerCase())) {
        needle = carAliases.join('|');
      }
      if (charAliases.includes(needle.toLowerCase())) {
        needle = charAliases.join('|');
      }

      const re = new RegExp(`\\b${needle}\\b`, 'i');
      return m.replace(re, `<span class="identifier">$&</span>`);
    }, links);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Command, Extension, Game } from '../models';
import { commandParams } from '../utils';
import { words } from 'lodash';

@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  transform(command: Command, game: Game, extensions: Extension[]) {
    if (!command.short_desc) {
      return '';
    }

    // todo: gradually replace ids with names
    const linkedIds = command.short_desc.replace(
      /0[\dA-Fa-f][\dA-Fa-f][\dA-Fa-f]/g,
      (id) => {
        const extension = extensions.find((e) =>
          e.commands.find((c) => c.id === id)
        );
        if (!extension) {
          return id;
        }

        return `<a href="#/${game}/${extension.name}/${id}">${id}</a>`;
      }
    );
    const re =
      game === Game.bully
        ? /(\W)([A-Z][A-Za-z]+)(\W|$)/g
        : /(\W)([A-Z\d_]+)(\W|$)/g;
    const linkedNames = linkedIds.replace(re, (match, p1, name, p3) => {
      const extension = extensions.find((e) =>
        e.commands.find((c) => c.name === name)
      );
      if (!extension) {
        return match;
      }

      return `${p1}<a href="#/${game}/${extension.name}/${name}">${name}</a>${p3}`;
    });
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
    }, linkedNames);
  }
}

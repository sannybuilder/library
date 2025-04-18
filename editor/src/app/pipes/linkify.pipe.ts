import { Pipe, PipeTransform } from '@angular/core';
import { Command, Extension, Game, ViewContext } from '../models';
import { commandParams } from '../utils';
import { words } from 'lodash';

const reAscii = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

@Pipe({
    name: 'linkify',
    standalone: false
})
export class LinkifyPipe implements PipeTransform {
  transform(
    command: Command | string,
    game: Game,
    extensions: Extension[],
    viewContext: ViewContext
  ) {
    const short_desc = getShortDesc(command);

    if (!short_desc) {
      return '';
    }

    const base = [
      game,
      viewContext === ViewContext.Code
        ? 'native/versions'
        : 'script/extensions',
    ].join('/');

    // todo: gradually replace ids with names
    const linkedIds = short_desc.replace(
      /\b[0-7][\dA-Fa-f][\dA-Fa-f][\dA-Fa-f](?!.png)\b/g,
      (id) => {
        const extension = extensions.find((e) =>
          e.commands.find((c) => c.id === id)
        );
        if (!extension) {
          return id;
        }

        return `<a href="#/${base}/${extension.name}/${id}">${id}</a>`;
      }
    );
    const re =
      game === Game.bully
        ? /(\W)([A-Z][A-Za-z]+)(\b)/g
        : /(\W)([A-Z\d_]+)(\b)/g;
    const linkedNames = linkedIds.replace(re, (match, p1, name, p3) => {
      const extension = extensions.find((e) =>
        e.commands.find((c) => c.name === name)
      );
      if (!extension) {
        return match;
      }

      return `${p1}<a href="#/${base}/${extension.name}/${name}">${name}</a>${p3}`;
    });
    const aliases = [
      ['car', 'vehicle'],
      ['ped', 'character', 'char'],
      ['number', 'num'],
    ];

    if (typeof command === 'string') {
      return linkedNames;
    }

    const spanTag = '####';
    const classAttr = '%%%%';
    const newDescription = commandParams(command).reduce((m, p) => {
      const { name } = p;

      if (name === 'a') {
        return m;
      }

      let needle =
        name === 'self' || !name ? p.type : words(name, reAscii).join(' ');

      aliases.forEach((alias) => {
        if (alias.includes(needle.toLowerCase())) {
          needle = alias.join('|');
        }
      });

      const re = new RegExp(`\\b${needle}\\b`, 'ig');
      return m.replace(re, `<${spanTag} ${classAttr}>$&</${spanTag}>`);
    }, linkedNames);

    // hacky workaround to avoid replacing <span> tags in the description
    return newDescription
      .replace(new RegExp(classAttr, 'g'), 'class="param-name"')
      .replace(new RegExp(spanTag, 'g'), 'span');
  }
}

function getShortDesc(
  command: string | Command | (Command & { _highlight: Command })
) {
  if (typeof command === 'string') {
    return command;
  }
  if ('_highlight' in command) {
    return command._highlight.short_desc;
  }

  return command.short_desc;
}

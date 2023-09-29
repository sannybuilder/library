import { Pipe, PipeTransform } from '@angular/core';
import { Command, Extension } from '../models';
import { template } from 'lodash';
import { braceify, stringifyWithColon } from './params';

@Pipe({
  name: 'parametrify',
})
export class ParametrifyPipe implements PipeTransform {
  transform(
    snippet: string,
    command: Command,
    showOpcodes: boolean,
    extensions: Extension[]
  ): string {
    let s = snippet;
    if (showOpcodes) {
      s = toggleOpcodes(s, extensions);
    }
    s = s.replace(
      new RegExp('\\b' + command.name + '\\b', 'ig'),
      '<span class="identifier">$&</span>'
    );
    const compiled = template(s);
    const stringify = (key: 'input' | 'output') =>
      (command[key] ?? []).reduce((m, v, i) => {
        m[key + (i + 1)] = braceify(stringifyWithColon(v), '[]');
        return m;
      }, {} as Record<string, string>);

    try {
      return compiled({
        ...stringify('input'),
        ...stringify('output'),
      });
    } catch {
      return '[invalid code snippet]';
    }
  }
}

function toggleOpcodes(code: string, extensions: Extension[]): string {
  const lines = code.split('\n');

  const linesWithOpcodes = lines.map((line) => {
    const words = line.split(' ');
    const reserved = ['', 'repeat', 'until', 'while', 'if', 'then', 'else'];

    let not = false;
    let keyword = '';
    let keywordIndex = 0;
    for (let i = 0; i < words.length; i++) {
      let word = words[i].toLowerCase();

      if (reserved.includes(word)) {
        continue;
      }

      if (word === 'not') {
        not = true;
        keywordIndex = i;
        continue;
      }

      keyword = word;
      if (!not) keywordIndex = i;
      break;
    }

    if (!keyword) {
      return line;
    }

    for (let extension of extensions) {
      const command = extension.commands.find(
        (c) => c.name.toLowerCase() === keyword
      );
      if (command) {
        let id = command.id;
        if (not) {
          id = (parseInt(id, 16) + 0x8000).toString(16).toUpperCase();
        }
        words[keywordIndex] = `${id}: ${words[keywordIndex]}`;
        return words.join(' ');
      }
    }
    return line;
  });

  return linesWithOpcodes.join('\n');
}

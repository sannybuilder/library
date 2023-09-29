import { Pipe, PipeTransform } from '@angular/core';
import { Command, Extension, Game } from '../models';
import { template } from 'lodash';
import { braceify, stringifyWithColon } from './params';

@Pipe({
  name: 'codify',
})
export class CodifyPipe implements PipeTransform {
  transform(
    code: string,
    command: Command,
    game: Game,
    showOpcodes: boolean,
    extensions: Extension[]
  ): string {
    let normalized = normalizeTabs(code);
    let formatted = format(normalized, command, extensions, showOpcodes, game);
    let compiled = compileTemplate(formatted, command);
    return compiled;
  }
}

function normalizeTabs(code: string): string {
  //replace tabs with 4 spaces
  return code.replace(/\t/g, '    ');
}

function compileTemplate(code: string, command: Command): string {
  const compiled = template(code);
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

function format(
  code: string,
  command: Command,
  extensions: Extension[],
  showOpcodes: boolean,
  game: Game
): string {
  const lines = code.split('\n');

  const linesWithOpcodes = lines.map((line) => {
    const words = line.split(' ');
    const reserved = ['', 'repeat', 'until', 'while', 'if', 'then', 'else'];

    let not = false;
    let keyword = '';
    let keywordIndex = 0;
    let opcodeIndex = 0;
    let shouldHighlight = false;

    for (let i = 0; i < words.length; i++) {
      let word = words[i].toLowerCase();

      if (reserved.includes(word)) {
        continue;
      }

      if (matches(word, 'not')) {
        not = true;
        keywordIndex = opcodeIndex = i;
        continue;
      }

      keyword = word;
      shouldHighlight = matches(keyword, command.name);
      if (!not) opcodeIndex = i;
      keywordIndex = i;
      break;
    }

    if (!keyword) {
      return line;
    }

    for (let extension of extensions) {
      const command = extension.commands.find((c) => matches(c.name, keyword));
      if (command) {
        let id = command.id;
        if (not) {
          id = (parseInt(id, 16) + 0x8000).toString(16).toUpperCase();
        }

        if (shouldHighlight) {
          words[
            keywordIndex
          ] = `<span class="identifier">${words[keywordIndex]}</span>`;
        } else {
          words[keywordIndex] = `<a href="#/${game}/${extension.name}/${
            command.id || command.name
          }" title="${command.short_desc}">${words[keywordIndex]}</a>`;
        }

        if (showOpcodes) {
          words[opcodeIndex] = [id, words[opcodeIndex]].join(': ');
        }
        return words.join(' ');
      }
    }
    return line;
  });

  return linesWithOpcodes.join('\n');
}

function matches(s1: string, s2: string) {
  return s1.toLowerCase() === s2.toLowerCase();
}

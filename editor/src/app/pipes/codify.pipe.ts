import { Pipe, PipeTransform } from '@angular/core';
import { Command, Extension, Game } from '../models';
import { template } from 'lodash';
import { braceify, stringifyWithColon } from './params';
import Prism from 'prismjs';
import 'prismjs/components/prism-pascal';

Prism.languages.sb = Prism.languages.extend('pascal', {
  keyword: [
    {
      pattern:
        /(^|[^&])\b(?:IF|AND|CONST|DOWNTO|ELSE|END|FOR|HEX|NOT|OR|REPEAT|THEN|TO|UNKNOWN|VAR|UNTIL|WHILE|INTEGER|INT|FLOAT|SHORTSTRING|STRING|LONGSTRING|IMPORT|EXPORT|SWITCH|CASE|DEFAULT|FUNCTION|CDECL|STDCALL|THISCALL)\b/i,
      lookbehind: true,
    },
  ],
  number: [
    {
      pattern:
        /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
    },
    { pattern: /(^|[^&])\b(?:TRUE|FALSE)\b/i },
  ],
  comment: {
    pattern: /\/\*[\s\S]*?\*\/|\{[\s\S]*?\}|\/\/.*/,
    greedy: true,
  },
});

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
    let normalized = normalize(code);
    let compiled = compileTemplate(normalized, command);
    let formatted = format(compiled, command, extensions, showOpcodes, game);
    return formatted;
  }
}

function normalize(code: string): string {
  // replace tabs with 4 spaces, and angle brackets with html entities
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
  const highlightName = command.name.startsWith('0x')
    ? `${command.class}_${command.member}`
    : command.name;

  const tokenized = Prism.highlight(
    code,
    { ...Prism.languages.sb, function: new RegExp(highlightName, 'i') },
    'sb'
  );

  const lines = tokenized.split('\n').map((line) => line.trimEnd());
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

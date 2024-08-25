import { Pipe, PipeTransform } from '@angular/core';
import { Command, Extension, Game } from '../models';
import { template } from 'lodash';
import { braceify, stringifyWithColon } from './params';
import Prism from 'prismjs';
import 'prismjs/components/prism-pascal';
import { FunctionParamsPipe } from './function-params.pipe';

Prism.languages.sb = Prism.languages.extend('pascal', {
  keyword: [
    {
      pattern:
        /(^|[^&])\b(?:IF|AND|CONST|DOWNTO|ELSE|END|FOR|HEX|NOT|OR|REPEAT|THEN|TO|UNKNOWN|VAR|UNTIL|WHILE|INTEGER|INT|FLOAT|SHORTSTRING|STRING|LONGSTRING|IMPORT|EXPORT|SWITCH|CASE|DEFAULT|FUNCTION|CDECL|STDCALL|THISCALL)\b/i,
      lookbehind: true,
    },
  ],
  number: [
    { pattern: /[0-9a-fA-F]{4}:/, alias: 'opcode' },
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
    extensions: Extension[] = []
  ): string {
    let normalized = normalize(code);
    let compiled = compileTemplate(normalized, command, game);
    let formatted = format(compiled, command, extensions, showOpcodes, game);
    return formatted;
  }
}

function normalize(code: string): string {
  // replace tabs with 4 spaces
  return code.replace(/\t/g, '    ');
}

function compileTemplate(code: string, command: Command, game: Game): string {
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
      decl: generateDeclaration(command, game),
    });
  } catch {
    return '[invalid code snippet]';
  }
}

function generateDeclaration(command: Command, game: Game): string {
  if (!command.member) {
    return '';
  }

  let declaration = 'function ';

  if (command.class) {
    declaration += `${command.class}_${command.member}`;
  } else {
    declaration += command.member;
  }

  if (command.cc && command.name) {
    declaration += `<${command.cc}, ${command.name}>`;
  }

  declaration += new FunctionParamsPipe().transform(command, game, true);

  return declaration;
}

function format(
  code: string,
  command: Command,
  extensions: Extension[],
  showOpcodes: boolean,
  game: Game
): string {
  const highlightName = getName(command);
  const opcodified = showOpcodes ? opcodify(code, extensions) : code;
  const highlighted = Prism.highlight(
    opcodified,
    { ...Prism.languages.sb, function: new RegExp(highlightName, 'i') },
    'sb'
  );
  return linkify(highlighted, extensions, game);
}

function matches(s1: string, s2: string) {
  return s1.toLowerCase() === s2.toLowerCase();
}

function opcodify(text: string, extensions: Extension[]): string {
  return text
    .split('\n')
    .map((line) => line.trimEnd())
    .map((line) => {
      const words = line.split(' ');
      const reserved = ['', 'repeat', 'until', 'while', 'if', 'then', 'else'];

      let not = false;
      let keyword = '';
      let opcodeIndex = 0;

      for (let i = 0; i < words.length; i++) {
        let word = words[i].toLowerCase();

        if (reserved.includes(word)) {
          continue;
        }

        if (matches(word, 'not')) {
          not = true;
          opcodeIndex = i;
          continue;
        }

        keyword = word;
        if (!not) opcodeIndex = i;
        break;
      }

      if (!keyword) {
        return line;
      }

      for (let extension of extensions) {
        const command = extension.commands.find((c) =>
          matches(c.name, keyword)
        );
        if (command) {
          let id = command.id;
          if (not) {
            id = (parseInt(id, 16) + 0x8000).toString(16).toUpperCase();
          }

          words[opcodeIndex] = [id, words[opcodeIndex]].join(': ');

          return words.join(' ');
        }
      }
      return line;
    })
    .join('\n');
}

function linkify(text: string, extensions: Extension[], game: Game): string {
  const lines = text.split('\n').map((line) => line.trimEnd());
  const linesWithOpcodes = lines.map((line) => {
    const words = line.split(' ');
    const reserved = [
      '',
      'repeat',
      'until',
      'while',
      'if',
      'then',
      'else',
      'not',
    ];

    for (let i = 0; i < words.length; i++) {
      let word = words[i].toLowerCase();

      if (reserved.includes(word)) {
        continue;
      }

      for (let extension of extensions) {
        const command = extension.commands.find((c) =>
          matches(getName(c), word)
        );
        if (command) {
          const base = command.name.startsWith('0x')
            ? 'native/versions'
            : 'script/extensions';
          words[i] = `<a class="identifier" href="#/${game}/${base}/${
            extension.name
          }/${command.id || command.name}" title="${command.short_desc}">${
            words[i]
          }</a>`;

          return words.join(' ');
        }
      }
    }
    return line;
  });

  return linesWithOpcodes.join('\n');
}

function getName(command: Command) {
  return command.name.startsWith('0x')
    ? `${command.class}_${command.member}`
    : command.name;
}

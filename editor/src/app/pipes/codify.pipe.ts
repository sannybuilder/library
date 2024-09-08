import { Pipe, PipeTransform } from '@angular/core';
import { Command, Extension, Game } from '../models';
import { template } from 'lodash';
import { braceify, stringifyWithColonNoHighlight } from './params';
import { functionName, generateFunctionDeclaration } from '../utils';
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
  string: [
    {
      pattern: /'(?:[^'\\]|\\.)*'/,
      greedy: true,
    },
    {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true,
    },
  ],
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
      m[key + (i + 1)] = braceify(stringifyWithColonNoHighlight(v), '[]');
      return m;
    }, {} as Record<string, string>);

  try {
    return compiled({
      ...stringify('input'),
      ...stringify('output'),
      // decl: generateFunctionDeclaration(command, game),
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
  const highlightName = getName(command);
  const isNativeFunction = command.name.startsWith('0x');
  const opcodified = showOpcodes ? opcodify(code, extensions) : code;
  const declaratified = isNativeFunction
    ? declaratify(opcodified, extensions, game)
    : opcodified;
  const highlighted = Prism.highlight(
    declaratified,
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
          if (!id) {
            return line;
          }
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

function declaratify(
  text: string,
  extensions: Extension[],
  game: Game
): string {
  const foundFunctions: Set<Command> = new Set();
  const names = text.match(/\b\w+\b/g) ?? [];

  for (let name of names) {
    for (let extension of extensions) {
      const command = extension.commands.find((c) =>
        matches(functionName(c), name)
      );
      if (command) {
        foundFunctions.add(command);
      }
    }
  }

  const decls = [...foundFunctions]
    .map(
      (command) =>
        (command.short_desc ? `/// ${command.short_desc}\n` : '') +
        generateFunctionDeclaration(command, game)
    )
    .concat(['', '']);
  return decls.join('\n') + text;
}

function linkify(text: string, extensions: Extension[], game: Game): string {
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

  return text.replace(/\b\w+\b/g, (match) => {
    if (reserved.includes(match)) {
      return match;
    }
    for (let extension of extensions) {
      const command = extension.commands.find((c) =>
        matches(getName(c), match)
      );
      if (command) {
        const isNativeFunction = command.name.startsWith('0x');
        const base = isNativeFunction ? 'native/versions' : 'script/extensions';

        return `<a class="identifier" href="#/${game}/${base}/${
          extension.name
        }/${command.id || command.name}" title="${
          command.short_desc || ''
        }">${match}</a>`;
      }
    }
    return match;
  });
}

function getName(command: Command) {
  return command.name.startsWith('0x') ? functionName(command) : command.name;
}

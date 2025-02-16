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
  standalone: false,
})
export class CodifyPipe implements PipeTransform {
  transform(
    code: string,
    options: {
      command: Command;
      game: Game;
      showOpcodes: boolean;
      showFuncDeclarations: boolean;
      extensions: Extension[];
      extension: string;
    }
  ): string {
    let normalized = normalize(code);
    let compiled = compileTemplate(normalized, options.command, options.game);
    let formatted = format(compiled, options);
    return formatted.trim();
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
    });
  } catch {
    return '[invalid code snippet]';
  }
}

function format(
  code: string,
  {
    command,
    game,
    showOpcodes = false,
    showFuncDeclarations = false,
    extensions = [],
    extension,
  }: {
    command: Command;
    game: Game;
    showOpcodes?: boolean;
    showFuncDeclarations?: boolean;
    extensions?: Extension[];
    extension: string;
  }
): string {
  const highlightName = getName(command);
  const opcodified = showOpcodes
    ? opcodify(code, extensions, command, extension)
    : code;
  const declaratified = showFuncDeclarations
    ? declaratify(opcodified, extensions, game)
    : opcodified;
  const highlighted = Prism.highlight(
    declaratified,
    {
      ...Prism.languages.sb,
      function: new RegExp(`\\b${highlightName}\\b`, 'i'),
    },
    'sb'
  );
  return linkify(highlighted, extensions, game, command, extension);
}

function matches(s1: string, s2: string) {
  return s1.toLowerCase() === s2.toLowerCase();
}

function opcodify(
  text: string,
  extensions: Extension[],
  command: Command,
  extension: string
): string {
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

      const found = findCommand(extensions, keyword, command, extension);

      if (found) {
        let id = found.command.id;
        if (!id) {
          return line;
        }
        if (not) {
          id = (parseInt(id, 16) + 0x8000).toString(16).toUpperCase();
        }

        words[opcodeIndex] = [id, words[opcodeIndex]].join(': ');

        return words.join(' ');
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

function linkify(
  text: string,
  extensions: Extension[],
  game: Game,
  command: Command,
  extension: string
): string {
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

    const found = findCommand(extensions, match, command, extension);

    if (found) {
      const isNativeFunction = found.command.name.startsWith('0x');
      const base = isNativeFunction ? 'native/versions' : 'script/extensions';

      return `<a class="identifier" href="#/${game}/${base}/${
        found.extension
      }/${found.command.id || found.command.name}" title="${
        found.command.short_desc || ''
      }">${match}</a>`;
    }
    return match;
  });
}

function findCommand(
  extensions: Extension[],
  keyword: string,
  command: Command,
  extension: string
) {
  for (let { name, commands } of extensions) {
    const found = commands.find((c) => {
      const commandName = getName(c);
      if (!matches(commandName, keyword)) {
        return false;
      }
      if (!matches(c.name, command.name)) {
        return true;
      }

      // in case of duplicate name in different extensions, pick one that matches the extension of the snippet command
      return extension === name;
    });

    if (found) {
      return { command: found, extension: name };
    }
  }
  return null;
}

function getName(command: Command) {
  return command.name.startsWith('0x') ? functionName(command) : command.name;
}

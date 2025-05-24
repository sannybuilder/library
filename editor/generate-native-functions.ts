import { Command, Extension, Game } from './src/app/models/index';
import { generateFunctionDeclaration } from './src/app/utils';

const { readFileSync, writeFileSync } = require('fs');

export function run(inFile: string, game: Game, outFile: string) {
  if (!inFile) {
    console.error('specify the input file');
    process.exit(1);
  }

  if (!outFile) {
    console.error('specify the path to the output file');
    process.exit(1);
  }

  console.log(`Generating native functions from ${inFile}`);

  const { extensions } = loadFile(inFile);
  const lines = [];
  const names = new Set<string>();

  for (const { name, commands } of extensions) {
    for (const command of commands) {
      if (names.has(command.name)) {
        console.warn(`Duplicate command: ${command.name}`);
        // continue;
      }
      names.add(command.name);
      lines.push(makeLine(command));
    }
  }

  writeFileSync(outFile, lines.join('\n'), {
    encoding: 'utf8',
  });

  function loadFile(path: string) {
    const file = readFileSync(path);
    const content: { extensions: Extension[] } = JSON.parse(file);

    return content;
  }

  function makeLine(command: Command) {
    return generateFunctionDeclaration(command, game);
  }
}

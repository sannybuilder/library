import {
  Game,
  GameEnums,
} from './src/app/models/index';

const { readFileSync, writeFileSync } = require('fs');
const [outFile] = process.argv.slice(2);
if (!outFile) {
  console.error('specify the path to the output file');
  process.exit(1);
}
const { join } = require('path');

const state = Object.entries(GameEnums).reduce((memo, [game, path]) => {
  memo[game as Game] = loadFile(join('..', path));
  return memo;
}, {} as Record<Game, string[]>);

writeFileSync(outFile, JSON.stringify(state), { encoding: 'utf8' });

function loadFile(path: string) {
  const file = readFileSync(path);
  const content: Record<string, any> = JSON.parse(file);

  return Object.keys(content);
}

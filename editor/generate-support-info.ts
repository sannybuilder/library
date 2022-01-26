import {
  Extension,
  Game,
  GameLibrary,
  SupportInfo,
} from './src/app/models/index';
import { getSupportInfo } from './src/app/utils/support-info';

const { readFileSync, writeFileSync } = require('fs');
const [outFile] = process.argv.slice(2);
if (!outFile) {
    console.error('specify the path to the output file');
    process.exit(1);
}
const { join } = require('path');

const state = Object.entries(GameLibrary).reduce((memo, [game, path]) => {
  memo[game as Game] = loadFile(join('..', path));
  return memo;
}, {} as Record<Game, { extensions: Extension[] }>);

const supportInfo = Object.entries(state).reduce(
  (memo, [game, { extensions }]) => {
    memo[game as Game] = getSupportInfo(extensions, state, game as Game);
    return memo;
  },
  {} as Record<Game, SupportInfo>
);

writeFileSync(outFile, JSON.stringify(supportInfo), { encoding: 'utf8'})

function loadFile(path: string) {
  const file = readFileSync(path);
  const content: { extensions: Extension[] } = JSON.parse(file);

  return content;
}

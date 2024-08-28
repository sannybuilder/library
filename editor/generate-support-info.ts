import {
  Extension,
  Game,
  GameLibrary,
  PackedSupportInfo,
} from './src/app/models/index';
import { getPackedSupportInfo } from './src/app/utils/support-info';

const { readFileSync, writeFileSync } = require('fs');

export function run(outFile: string) {
  if (!outFile) {
    console.error('specify the path to the output file');
    process.exit(1);
  }
  console.log(`Generating support info to ${outFile}`);
  
  const { join } = require('path');

  const state = Object.entries(GameLibrary).reduce((memo, [game, path]) => {
    memo[game as Game] = loadFile(join('..', path));
    return memo;
  }, {} as Record<Game, { extensions: Extension[] }>);

  const supportInfo = Object.entries(state).reduce(
    (memo, [game, { extensions }]) => {
      memo[game as Game] = getPackedSupportInfo(
        extensions,
        state,
        game as Game
      );
      return memo;
    },
    {} as Record<Game, Record<string, Record<string, PackedSupportInfo[]>>>
  );

  writeFileSync(outFile, JSON.stringify(supportInfo), { encoding: 'utf8' });

  function loadFile(path: string) {
    const file = readFileSync(path);
    const content: { extensions: Extension[] } = JSON.parse(file);

    return content;
  }
}

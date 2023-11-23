import { readFileSync, writeFileSync } from 'fs';
import { normalize } from './src/app/utils';
import { bump } from './bump';

const games = JSON.parse(readFileSync('games.json', 'utf8'));

for (let game of games) {
  const libFile = readFileSync(`../${game}/${game}.json`, 'utf8');
  const lib = JSON.parse(libFile);

  lib.extensions = normalize(lib.extensions, game);

  const newContent = JSON.stringify(lib, null, 2);
  writeFileSync(`../${game}/${game}.json`, newContent);

  bump(game);
}

import { Game } from 'src/app/models';

const { join } = require('path');
const { readFileSync } = require('fs');
const { execSync } = require('child_process');

const gamesRaw = readFileSync('games.json');
const games: Game[] = JSON.parse(gamesRaw);

run('npm run generate:support-info dist/editor/assets/support-info.json');

// GENERATE DATA FILES
games.forEach((game) => {
  const assets = join('dist', 'editor', 'assets', game);
  const gameJson = join('../', game, `${game}.json`);
  const enumsJson = join('../', game, `enums.json`);

  [
    `npm run validate:commands ${gameJson} ${game}`,
    `npm run validate:enums ${enumsJson}`,
    `[ -d ${assets} ] || mkdir ${assets}`,

    `npm run generate:enums ${enumsJson} ${join(assets, 'enums.js')}`,
    `cp ${gameJson} ${assets}`,
    `cp ${enumsJson} ${assets}`,
  ].forEach(run);

  if (!game.includes('unknown')) {
    let dest = join('..', 'editor', assets);
    [
      `cargo run enums ${enumsJson} > ${join(dest, 'enums.txt')}`,
      `cargo run classes ${gameJson} ${game} > ${join(dest, 'classes.db')}`,
      `cargo run keywords ${gameJson} ${game} > ${join(dest, 'keywords.txt')}`,
    ].forEach(cargo);
  }
});

// GENERATE SNIPPETS
['gta3', 'vc', 'sa', 'unknown_x86', 'unknown_x64'].forEach((game) => {
  const assets = join('..', 'editor', 'dist', 'editor', 'assets', game);
  const srcDir = join('..', game, 'snippets');
  cargo(`cargo run snippets ${srcDir} > ${assets}/snippets.json`);
});

function run(cmd: string) {
  execSync(cmd, {
    stdio: [0, 1, 2],
  });
}

function cargo(cmd: string) {
  execSync(cmd, {
    cwd: '../generator',
    stdio: [0, 1, 2],
  });
}

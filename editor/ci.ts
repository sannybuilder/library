import {
  Game,
  GameClassesAssets,
  GameEnumsAssets,
  GameKeywordsAssets,
  GameSnippets,
} from './src/app/models';

const { join } = require('path');
const { readFileSync } = require('fs');
const { execSync } = require('child_process');

const gamesRaw = readFileSync('games.json');
const games: Game[] = JSON.parse(gamesRaw);

run('npm run generate:support-info dist/editor/assets/support-info.json');
run('npm run generate:enums-info dist/editor/assets/enums-info.json');

// GENERATE DATA FILES
games.forEach((game) => {
  const assets = assetsDir(game);
  const gameJson = join('../', game, `${game}.json`);
  const enumsJson = join('../', game, `enums.json`);

  [
    `npm run validate:commands ${gameJson} ${game}`,
    `npm run validate:enums ${enumsJson} ${game}`,
    `[ -d ${assets} ] || mkdir ${assets}`,

    `npm run generate:enums ${enumsJson} ${join(assets, 'enums.js')}`,
    `cp ${gameJson} ${assets}`,
    `cp ${enumsJson} ${assets}`,
  ].forEach(run);

  try {
    if (
      [
        Game.gta3,
        Game.vc,
        Game.sa,
        Game.gta3_mobile,
        Game.vc_mobile,
        Game.sa_mobile,
        Game.gta3_unreal,
        Game.vc_unreal,
        Game.sa_unreal,
      ].includes(game)
    ) {
      run(`cp ../shared/docs ${assets} -r`);
    } else {
      run(`cp ../${game}/docs ${assets} -r`);
    }
  } catch {}

  let dest = assetsDirCargo(game);
  if (GameEnumsAssets[game]) {
    cargo(`cargo run enums ${enumsJson} > ${join(dest, 'enums.txt')}`);
  }
  if (GameClassesAssets[game]) {
    cargo(
      `cargo run classes ${gameJson} ${game} > ${join(dest, 'classes.db')}`
    );
  }
  if (GameKeywordsAssets[game]) {
    cargo(
      `cargo run keywords ${gameJson} ${game} > ${join(dest, 'keywords.txt')}`
    );
  }
  if (GameSnippets[game].includes(game)) {
    const srcDir = join('..', game, 'snippets');
    cargo(`cargo run snippets ${srcDir} > ${join(dest, 'snippets.json')}`);
  }
});

function assetsDir(game: string) {
  return join('dist', 'editor', 'assets', game);
}

function assetsDirCargo(game: string) {
  return join('..', 'editor', assetsDir(game));
}

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

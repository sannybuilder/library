import { doesGameRequireOpcode, getBaseGame } from './src/app/utils';
import {
  Game,
  GameClassesAssets,
  GameEnumsAssets,
  GameNativeAssets,
  GameSnippets,
} from './src/app/models';

const { join } = require('path');
const { readFileSync } = require('fs');
const { execSync } = require('child_process');

const gamesRaw = readFileSync('games.json');
const games: Game[] = JSON.parse(gamesRaw);

run('npm run generate:support-info src/assets/support-info.json');
run('npm run generate:enums-info src/assets/enums-info.json');
run(`cargo build`, '../generator');

// GENERATE DATA FILES
games.forEach((game) => {
  const assets = assetsDir(game);
  const gameJson = join('../', game, `${game}.json`);
  const nativeJson = join('../', game, `native.json`);
  const enumsJson = join('../', game, `enums.json`);

  [
    `[ -d ${assets} ] || mkdir ${assets}`,
    `npm run generate:enums ${enumsJson} ${join(assets, 'enums.js')}`,
  ].forEach((x) => run(x));

  if (doesGameRequireOpcode(game)) {
    run(
      `npm run generate:opcode-examples ${gameJson} ${join(
        assets,
        'opcodes.txt'
      )}`
    );
  }

  run(`cp *.json ../editor/src/assets/${game}`, join('..', game));
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
        Game.lcs,
        Game.vcs,
      ].includes(game)
    ) {
      run(
        `cp ../shared/docs ../editor/src/assets/${game} -r`,
        join('..', game)
      );
      const baseGame = getBaseGame(game);
      // use base game docs for mobile and definitive editions
      if (baseGame != game && baseGame != Game.unknown_x86) {
        run(
          `cp ../${baseGame}/docs ../editor/src/assets/${game} -r`,
          join('..', game)
        );
      }
    }
    // overwrite shared docs with game specific docs
    run(`cp ../${game}/docs ../editor/src/assets/${game} -r`, join('..', game));
  } catch {}

  let dest = assetsDirCargo(game);

  if (GameEnumsAssets[game]) {
    cargo(`enums ${enumsJson} > ${join(dest, 'enums.txt')}`);
  }
  if (GameClassesAssets[game]) {
    cargo(`classes ${gameJson} ${game} > ${join(dest, 'classes.db')}`);
  }
  if (GameSnippets[game].includes(game)) {
    const srcDir = join('..', game, 'snippets');
    cargo(`snippets ${srcDir} > ${join(dest, 'snippets.json')}`);
  }
  if (GameNativeAssets[game]) {
    cargo(`native ${nativeJson} 1.0 > ${join(dest, 'native.txt')}`);
  }
});

function assetsDir(game: string) {
  return join('src', 'assets', game);
}

function assetsDirCargo(game: string) {
  return join('..', 'editor', assetsDir(game));
}

function run(cmd: string, cwd = process.cwd()) {
  execSync(cmd, {
    cwd,
    stdio: [0, 1, 2],
  });
}

function cargo(cmd: string) {
  console.log(`generating "${cmd}"`);
  run(`"../generator/target/debug/generator.exe" ${cmd}`, '../generator');
}

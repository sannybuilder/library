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

run('npm run generate:support-info dist/editor/assets/support-info.json');
run('npm run generate:enums-info dist/editor/assets/enums-info.json');

// GENERATE DATA FILES
games.forEach((game) => {
  const assets = assetsDir(game);
  const gameJson = join('../', game, `${game}.json`);
  const nativeJson = join('../', game, `native.json`);
  const enumsJson = join('../', game, `enums.json`);

  [
    `npm run validate:commands ${gameJson} ${game}`,
    `npm run validate:enums ${enumsJson} ${game}`,
    `[ -d ${assets} ] || mkdir ${assets}`,

    `npm run generate:enums ${enumsJson} ${join(assets, 'enums.js')}`,
    `cp ${gameJson} ${assets}`,
    `cp ${enumsJson} ${assets}`,
  ].forEach(x => run(x));

  if (doesGameRequireOpcode(game)) {
    run(
      `npm run generate:opcode-examples ${gameJson} ${join(
        assets,
        'opcodes.txt'
      )}`
    );
  }

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
      run(`cp ../shared/docs ${assets} -r`);

      const baseGame = getBaseGame(game);
      // use base game docs for mobile and definitive editions
      if (baseGame != game && baseGame != Game.unknown_x86) {
        run(`cp ../${baseGame}/docs ${assets} -r`);
      }
    }

    // overwrite shared docs with game specific docs
    run(`cp ../${game}/docs ${assets} -r`);
  } catch {}

  let dest = assetsDirCargo(game);

  run(`cargo build`, '../generator');

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
  return join('dist', 'editor', 'assets', game);
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

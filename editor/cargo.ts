import {
  Game,
  GameClassesAssets,
  GameEnumsAssets,
  GameNativeAssets,
  GameSnippets,
} from './src/app/models';
import { run as validateNative } from './validate-native';

const { join } = require('path');
const { readFileSync } = require('fs');
const { execSync } = require('child_process');

run(`cargo build`, '../generator');

const gamesRaw = readFileSync('games.json');
const games: Game[] = JSON.parse(gamesRaw);

// GENERATE DATA FILES
games.forEach((game) => {
  const assets = assetsDir(game);
  const gameJson = join('../', game, `${game}.json`);
  const nativeJson = join('../', game, `native.json`);
  const enumsJson = join('../', game, `enums.json`);

  run(`[ -d ${assets} ] || mkdir -p ${assets}`);
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
    validateNative(nativeJson, game);
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
  run(`"../generator/target/debug/generator" ${cmd}`, '../generator');
}

import { Game } from 'src/app/models';

const { join } = require('path');
const { readFileSync } = require('fs');
const { execSync } = require('child_process');

const gamesRaw = readFileSync('games.json');
const games: Game[] = JSON.parse(gamesRaw);

games.forEach((game) => {
  execSync(`npm run validate:commands ../${game}/${game}.json ${game}`, {
    stdio: [0, 1, 2],
  });

  execSync(`npm run validate:enums ../${game}/enums.json`, {
    stdio: [0, 1, 2],
  });

  execSync(`mkdir ${join('dist', 'editor', 'assets', game)} -p`, {
    stdio: [0, 1, 2],
  });

  execSync(
    `npm run generate:enums ../${game}/enums.json dist/editor/assets/${game}/enums.js`,
    {
      stdio: [0, 1, 2],
    }
  );

  execSync(`cp ../${game}/${game}.json dist/editor/assets/${game}`, {
    stdio: [0, 1, 2],
  });

  execSync(`cp ../${game}/enums.json dist/editor/assets/${game}`, {
    stdio: [0, 1, 2],
  });

  if (!game.includes('unknown')) {
    execSync(
      `cargo run enums ../gta3/enums.json > ../editor/dist/editor/assets/gta3/enums.txt`,
      {
        cwd: '../generator',
        stdio: [0, 1, 2],
      }
    );

    execSync(
      `cargo run classes ../${game}/${game}.json ${game} > ../editor/dist/editor/assets/${game}/classes.db`,
      {
        cwd: '../generator',
        stdio: [0, 1, 2],
      }
    );

    execSync(
      `cargo run keywords ../${game}/${game}.json ${game} > ../editor/dist/editor/assets/${game}/keywords.txt`,
      {
        cwd: '../generator',
        stdio: [0, 1, 2],
      }
    );
  }
});

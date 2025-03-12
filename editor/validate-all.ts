import { existsSync } from "fs";

const games = require('./games.json');
const { run: validateCommands } = require('./validate-commands');
const { run: validateSnippets } = require('./validate-snippets');
const { run: validateNatives } = require('./validate-native');
for (const game of games) {
  validateCommands(`../${game}/${game}.json`, game);
  validateSnippets(`../${game}`, game);
  if (existsSync(`../${game}/native.json`)) {
    validateNatives(`../${game}/native.json`, game);
  }
}

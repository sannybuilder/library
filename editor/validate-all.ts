const games = require('./games.json');
const { run: validateCommands } = require('./validate-commands');
const { run: validateSnippets } = require('./validate-snippets');
for (const game of games) {
  validateCommands(`../${game}/${game}.json`, game);
  validateSnippets(`../${game}`, game);
}

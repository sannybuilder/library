const games = require('./games.json');
const { run: validateCommands } = require('./validate-commands');
for (const game of games) {
  console.log(`Validating commands in ${game}`);

  validateCommands(`../${game}/${game}.json`, game);
}

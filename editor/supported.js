const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const DOES_NOT_EXIST = -2;
const IS_UNSUPPORTED = -1;
const IS_NOP = 0;
const IS_SUPPORTED = 1;
const HAS_DIFF_PARAMS = 2;

const games = ["gta3", "vc", "sa"];

const sources = games.map((game) => {
  const source = readFileSync(join("..", game, `${game}.json`), {
    encoding: "utf-8",
  });

  return JSON.parse(source);
});

games.forEach((game, i) => {
  const result = sources[i].extensions.reduce((m, { name, commands }) => {
    m[name] = commands.reduce((m2, command) => {
      m2[command.id] = games.map((v3, i) => ({
        game: v3,
        level: getSupportLevel(getCommand(sources[i], name, command), command),
      }));
      return m2;
    }, {});
    return m;
  }, {});

  const json = JSON.stringify(result, null, 2);

  writeFileSync(join("./src/assets", game, "supported.json"), json, {
    encoding: "utf-8",
  });
});

function getCommand(source, extensionName, command) {
  const extension = source.extensions.find((e) => e.name === extensionName);
  return (
    extension &&
    extension.commands &&
    extension.commands.find((c) => c.id === command.id)
  );
}

function getSupportLevel(command, otherCommand) {
  // no command with the same id
  if (!command) {
    return DOES_NOT_EXIST;
  }

  // same ids, but different names (e.g. 03E2)
  if (command.name !== otherCommand.name) {
    return HAS_DIFF_PARAMS;
  }

  const attrs = command.attrs || {};
  const otherAttrs = otherCommand.attrs || {};

  const { is_nop, is_unsupported } = attrs;
  if (is_unsupported) {
    return IS_UNSUPPORTED;
  }
  if (is_nop) {
    return IS_NOP;
  }
  if (
    otherCommand.num_params !== command.num_params &&
    !otherAttrs.is_unsupported
  ) {
    return HAS_DIFF_PARAMS;
  }
  return IS_SUPPORTED;
}

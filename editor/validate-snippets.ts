import { Game, LoadExtensionsResponse } from './src/app/models';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { basename, dirname, join } from 'path';
import { getName } from './src/app/pipes';

export function run(inputDir: string, game: Game) {
  const _commands = readFileSync(join(inputDir, `${game}.json`), 'utf-8');
  let natives: LoadExtensionsResponse['extensions'] = [];
  if (existsSync(join(inputDir, `native.json`))) {
    const _natives = readFileSync(join(inputDir, `native.json`), 'utf-8');
    natives = JSON.parse(_natives).extensions;
  }
  const extensions: LoadExtensionsResponse['extensions'] =
    JSON.parse(_commands).extensions;

  const allExtensions = extensions.map((e) => e.name);
  const allNativeExtensions = natives.map((e) => e.name);

  const snippetDir = join(inputDir, 'snippets');
  if (!existsSync(snippetDir)) {
    console.warn(`Warn: Snippet directory not found at ${snippetDir}`);
    return;
  }
  console.log(`Validating snippets in ${snippetDir}`);

  let exitStatus = 0;
  readdirSync(snippetDir, {
    recursive: true,
    encoding: 'utf-8',
  }).forEach((file) => {
    const path = join(snippetDir, file);
    if (statSync(path).isDirectory()) {
      return;
    }
    const parentDir = dirname(file);
    const filename = basename(file).split('.')[0];

    let isNative = false;
    if (!allExtensions.includes(parentDir)) {
      if (!allNativeExtensions.includes(parentDir)) {
        console.error(`Error: Extension ${parentDir} not found in extensions`);
        exitStatus = 1;
      } else {
        isNative = true;
      }
    }

    const command = (isNative ? natives : extensions)
      .find((ext) => ext.name === parentDir)
      ?.commands.find((cmd) => (cmd.id || cmd.name) === filename);

    if (!command) {
      console.error(
        `Error: ${filename} not found in ${parentDir}, referenced in ${path}`
      );
      exitStatus = 1;
    } else {
      const name = getName(command);
      const snippet = readFileSync(path, 'utf-8');
      if (command.operator) {
        return;
      }
      if (snippet.trim().length === 0) {
        console.warn(`Error: Empty snippet ${path}`);
      }

      const slow = snippet.toLowerCase();
      if (!slow.includes(name.toLowerCase())) {
        const classForm =
          command.class && command.member ? `.${command.member}` : '';
        if (!classForm || !slow.includes(classForm.toLowerCase())) {
          console.error(
            `Error: Command name ${name} not found in snippet ${path}`
          );
          exitStatus = 1;
        }
      }
    }
  });

  if (exitStatus) process.exit(exitStatus);
}

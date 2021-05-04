import { forEach } from 'lodash';
import { LoadExtensionsResponse } from './src/app/models';
import { isAnyAttributeInvalid } from './src/app/utils/validation';

const { readFileSync } = require('fs');
const [inputFile] = process.argv.slice(2);
const file = readFileSync(inputFile);
const content: LoadExtensionsResponse = JSON.parse(file);

let exitStatus = 0;

forEach(content.extensions, (extension) => {
  forEach(extension.commands, (command) => {
    if (isAnyAttributeInvalid(command)) {
      console.error(
        `Invalid combination of attributes: id ${command.id}, extension "${extension.name}"`
      );
      exitStatus = 1;
    }
  });
});

process.exit(exitStatus);

/// <reference types="node" />

import { fromPairs } from 'lodash';
import { Command, Extension } from './src/app/models/index';
import { opcodify } from './src/app/pipes/opcodify';
import {
  inputParams,
  isSupported,
  outputParams,
} from './src/app/utils';

const { readFileSync, writeFileSync } = require('fs');
const [inFile, outFile] = process.argv.slice(2);
if (!inFile) {
  console.error('specify the input file');
  process.exit(1);
}

if (!outFile) {
  console.error('specify the path to the output file');
  process.exit(1);
}

const { extensions } = loadFile(inFile);
const lines = [];

for (const { name, commands } of extensions) {
  for (const command of commands) {
    if (isSupported(command.attrs)) {
      lines.push(makeLine(command));
    }
  }
}

writeFileSync(outFile, lines.join('\n'), {
  encoding: 'utf8',
});

function loadFile(path: string) {
  const file = readFileSync(path);
  const content: { extensions: Extension[] } = JSON.parse(file);

  return content;
}

function makeLine(command: Command) {
  let line = `${opcodify(command.id)}: `;
  if (command.attrs?.is_condition) {
    line += '  ';
  }
  line += command.name.toLowerCase();

  for (let param of inputParams(command)) {
    if (param.type === 'label') {
      line += ` @label`;
    } else {
      if (param.name === 'self') {
        line += ` [${param.type.toLowerCase()}]`;
      } else {
        if (param.name) {
          line += ` ${param.type.toLowerCase()} [${param.name}]`;
        } else {
          line += ` [${param.type.toLowerCase()}]`;
        }
      }
    }
  }
  const output = outputParams(command);
  if (output.length) {
    line += ' store_to';
    for (let param of output) {
      if (param.name) {
        line += ` ${param.type.toLowerCase()} [${param.name}]`;
      } else {
        line += ` [${param.type.toLowerCase()}]`;
      }
    }
  }
  return line;
}

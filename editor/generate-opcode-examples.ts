/// <reference types="node" />

import { Command, Extension, Param } from './src/app/models/index';
import { opcodify } from './src/app/pipes/opcodify';
import {
  inputParams,
  isSupported,
  outputParams,
  stringifyCommandWithOperator,
} from './src/app/utils';
import { braceify, stringifyTypeAndSource } from './src/app/pipes/params';

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

  if (command.operator) {
    const cb = (param: Param) => braceify(stringifyTypeAndSource(param), '[]');
    return line + stringifyCommandWithOperator(command, cb, cb);
  }

  line += command.name.toLowerCase();

  for (let param of inputParams(command)) {
    if (param.type === 'label') {
      line += ` @label`;
    } else {
      if (param.name === 'self') {
        line += ` [${param.type}]`;
      } else {
        if (param.name) {
          line += ` ${param.name} [${param.type}]`;
        } else {
          line += ` [${param.type}]`;
        }
      }
    }
  }
  const output = outputParams(command);
  if (output.length) {
    for (let param of output) {
      if (param.name) {
        line += ` ${param.name} ${braceify(
          stringifyTypeAndSource(param),
          '[]'
        )}`;
      } else {
        line += ` ${braceify(stringifyTypeAndSource(param), '[]')}`;
      }
    }
  }
  return line;
}

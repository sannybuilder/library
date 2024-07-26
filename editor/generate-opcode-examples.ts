/// <reference types="node" />

import { Command, Extension, Param } from './src/app/models/index';
import { opcodify } from './src/app/pipes/opcodify';
import {
  inputParams,
  isSupported,
  isVarSource,
  outputParams,
  stringifyCommandWithOperator,
} from './src/app/utils';
import {
  braceify,
  stringify,
  stringifySource,
  stringifyTypeAndSource,
} from './src/app/pipes/params';

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
const names = new Set<string>();

for (const { name, commands } of extensions) {
  for (const command of commands) {
    if (isSupported(command.attrs)) {
      if (names.has(command.name)) {
        console.warn(`Duplicate command: ${command.name}`);
        // continue;
      }
      names.add(command.name);
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
  let line = `{${opcodify(command.id)}:} `;
  if (command.attrs?.is_condition) {
    line += '  ';
  }

  if (command.operator) {
    const cb = (param: Param) => braceify(stringifyTypeAndSource(param), '[]');
    return line + stringifyCommandWithOperator(command, cb, cb);
  }

  const output = outputParams(command);
  const input = inputParams(command);

  if (output.length) {
    line += stringify(outputParams(command), ', ', (p) =>
      braceify((p.name ? stringifyWithColon : stringifyTypeAndSource)(p), '[]')
    );
    line += ' = ';
  }

  line += [
    command.name.toLowerCase(),

    stringify(input, ' ', (param) => {
      if (param.type === 'label') {
        return '@label';
      }
      const t = braceify(stringifyTypeAndSource(param), '[]');
      if (param.name && param.name !== 'self') {
        return `${getParamName(param)} ${t}`;
      }
      return t;
    }),
  ]
    .filter(Boolean)
    .join(' ');

  return line;
}

function getParamName(param: Param) {
  if (isVarSource(param.source)) {
    return `{var_${param.name}}`;
  }
  return `{${param.name}}`;
}

function stringifyWithColon(p: Param) {
  return [[stringifySource(p.source), p.name].filter(Boolean).join(' '), p.type]
    .filter(Boolean)
    .join(': ');
}

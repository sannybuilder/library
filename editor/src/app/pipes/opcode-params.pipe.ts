import { Pipe, PipeTransform } from '@angular/core';
import { snakeCase } from 'lodash';
import { Command, Param } from '../models';
import { inputParams, isVarSource, outputParams } from '../utils';
import {
  braceify,
  stringify,
  stringifySource,
  stringifyTypeAndSource,
} from './params';

@Pipe({
  name: 'opcodeParams',
})
export class OpcodeParamsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return '';
    }

    const output = outputParams(command);
    const input = inputParams(command);

    let line = '';
    if (output.length) {
      line += stringify(outputParams(command), ', ', (p) =>
        braceify(
          (p.name ? stringifyWithColon : stringifyTypeAndSource)(p),
          '[]'
        )
      );
      line += ' = ';
    }

    line += [
      `<span class="identifier">${command.name.toLowerCase()}</span>`,

      stringify(input, ' ', (param) => {
        const t = braceify(stringifyTypeAndSource(param), '[]');
        if (param.name && param.name !== 'self' && param.type !== 'label') {
          return `<span class="secondary">${getParamName(param)}</span> ${t}`;
        }
        return t;
      }),
    ]
      .filter(Boolean)
      .join(' ');

    return line;
  }

  private _tranformParamName(p: Param) {
    if (p.name === 'self') {
      return '';
    }
    return p.name
      ? `<span class="param-name">${snakeCase(p.name)}</span>`
      : p.name;
  }
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

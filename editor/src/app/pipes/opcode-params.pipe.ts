import { Pipe, PipeTransform } from '@angular/core';
import { snakeCase } from 'lodash';
import { Command, Param } from '../models';
import { inputParams, outputParams } from '../utils';
import { braceify, stringify, stringifyTypeAndSource } from './params';

@Pipe({
  name: 'opcodeParams',
})
export class OpcodeParamsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return '';
    }
    const input = stringify(inputParams(command), ' ', (p: Param) =>
      [this._tranformParamName(p), braceify(stringifyTypeAndSource(p), '[]')]
        .filter(Boolean)
        .join(' ')
    );

    const output = stringify(outputParams(command), ' ', (p: Param) =>
      [this._tranformParamName(p), braceify(stringifyTypeAndSource(p), '[]')]
        .filter(Boolean)
        .join(' ')
    );

    if (output) {
      return `${input} store_to ${output}`;
    }
    return input;
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

import { Pipe, PipeTransform } from '@angular/core';
import { Command, Param } from '../models';
import { inputParams, isVarSource } from '../utils';
import {
  braceify,
  stringify,
  stringifyTypeAndSource,
} from './params';

@Pipe({
  name: 'opcodeParams',
})
export class OpcodeParamsPipe implements PipeTransform {
  transform(command: Command): string {
    return [
      stringify(inputParams(command), ' ', (param) => {
        const t = braceify(stringifyTypeAndSource(param), '[]');
        if (param.name && param.name !== 'self' && param.type !== 'label') {
          return `<span class="secondary">${braceify(
            getParamName(param),
            '{}'
          )}</span> ${t}`;
        }
        return t;
      }),
    ]
      .filter(Boolean)
      .join(' ');
  }
}

function getParamName(param: Param) {
  if (isVarSource(param.source)) {
    return `var_${param.name}`;
  }
  return param.name;
}

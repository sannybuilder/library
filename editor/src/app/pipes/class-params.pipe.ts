import { Pipe, PipeTransform } from '@angular/core';
import { Command, PrimitiveType } from '../models';
import { commandParams } from '../utils';
import { braceify, stringify } from './params';

@Pipe({
  name: 'classParams',
})
export class ClassParamsPipe implements PipeTransform {
  transform(command: Command): string {
    let params = '()';
    if (command.num_params) {
      params = braceify(stringify(commandParams(command), ', '), '()');
    }

    if (command.attrs?.is_condition) {
      return `${params}: ${PrimitiveType.boolean}`;
    }
    return params;
  }
}

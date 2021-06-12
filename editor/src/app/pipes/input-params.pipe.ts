import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { inputParams } from '../utils';
import { braceify, stringify } from './params';

@Pipe({
  name: 'inputParams',
})
export class InputParamsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return '()';
    }
    return braceify(stringify(inputParams(command), ', '), '()');
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Command, SELF } from '../models';
import { inputParams } from '../utils';
import { braceify, stringify } from './params';

@Pipe({
  name: 'inputParams',
})
export class InputParamsPipe implements PipeTransform {
  transform(command: Command, skipSelf: boolean = false): string {
    if (!command.num_params) {
      return '()';
    }
    const params = skipSelf
      ? inputParams(command).filter((p) => p.name !== SELF)
      : inputParams(command);
    return braceify(stringify(params, ', '), '()');
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { inputParams } from '../utils';
import { braceify, stringify } from './params';

@Pipe({
  name: 'inputParamsJs',
})
export class InputParamsJsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return '()';
    }
    return braceify(
      stringify(
        inputParams(command)
          .filter((p) => p.name !== 'self')
          .map((p) => ({ ...p, type: '' })),
        ', '
      ),
      '()'
    );
  }
}

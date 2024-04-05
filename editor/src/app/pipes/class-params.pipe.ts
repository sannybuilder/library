import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { inputParams, outputParams } from '../utils';
import { braceify, stringify } from './params';

@Pipe({
  name: 'classParams',
})
export class ClassParamsPipe implements PipeTransform {
  transform(command: Command): string {
    let params = '()';
    if (command.input?.length) {
      params = braceify(stringify(inputParams(command), ', '), '()');
    }

    if (command.output?.length) {
      params = params + ': ';
      if (command.attrs?.is_condition) {
        params += 'optional ';
      }
      return (
        params +
        outputParams(command)
          .map((p) => p.type)
          .join(', ')
      );
    }

    if (command.attrs?.is_condition) {
      return `${params}: logical`;
    }

    return params;
  }
}

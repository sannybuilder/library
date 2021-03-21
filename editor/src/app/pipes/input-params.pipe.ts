import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { braceify, stringify } from './params';

@Pipe({
  name: 'inputParams',
})
export class InputParamsPipe implements PipeTransform {
  transform(value: Command): string {
    if (!value.num_params) {
      return '()';
    }
    const input = value?.input ?? [];
    return braceify(stringify(input, ', '), '()');
  }
}

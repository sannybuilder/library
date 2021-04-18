import { Pipe, PipeTransform } from '@angular/core';
import { Command, PrimitiveType } from '../models';
import { braceify, stringify } from './params';

@Pipe({
  name: 'classParams',
})
export class ClassParamsPipe implements PipeTransform {
  transform(value: Command): string {
    let params = '()';
    if (value.num_params) {
      const input = value?.input ?? [];
      const output = value?.output ?? [];
      params = braceify(stringify([...input, ...output], ', '), '()');
    }

    if (value.attrs?.is_condition) {
      return `${params}: ${PrimitiveType.boolean}`;
    }
    return params;
  }
}

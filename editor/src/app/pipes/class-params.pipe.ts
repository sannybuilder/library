import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';

@Pipe({
  name: 'classParams',
})
export class ClassParamsPipe implements PipeTransform {
  transform(value: Command): string {
    if (!value.num_params) {
      return '()';
    }
    const input = value?.input ?? [];
    const output = value?.output ?? [];
    return `(${[...input, ...output]
      .map((p) => {
        return `${p.name}: ${p.type}`;
      })
      .join(', ')})`;
  }
}

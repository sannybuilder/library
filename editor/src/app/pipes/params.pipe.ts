import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';

@Pipe({
  name: 'params',
})
export class ParamsPipe implements PipeTransform {
  transform(value: Command, ...args: unknown[]): unknown {
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

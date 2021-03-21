import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { braceify, stringify } from './params';

@Pipe({
  name: 'outputParams',
})
export class OutputParamsPipe implements PipeTransform {
  transform(value: Command): string {
    if (!value.num_params) {
      return '';
    }
    const output = value?.output ?? [];
    return braceify(stringify(output, ' '), '[]');
  }
}

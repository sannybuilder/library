import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { outputParams } from '../utils';
import { braceify, stringify } from './params';

@Pipe({
  name: 'outputParams',
})
export class OutputParamsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return '';
    }
    return braceify(stringify(outputParams(command), ' '), '[]');
  }
}

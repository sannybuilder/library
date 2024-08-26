import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { inputParams } from '../utils';
import { braceify, stringify } from './params';

@Pipe({
  name: 'nativeParams',
})
export class NativeParamsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return `("${command.name}")`;
    }
    return braceify(
      [`"${command.name}"`, stringify(inputParams(command), ', ')].join(', '),
      '()'
    );
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Command, Param } from '../models';
import { commandParams } from '../utils';
import { braceify, stringify, stringifyWithColon } from './params';

@Pipe({
  name: 'keywordParams',
})
export class KeywordParamsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return '';
    }
    return stringify(commandParams(command), ' ', (p: Param) =>
      braceify(stringifyWithColon(p), '[]')
    );
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Command, Param } from '../models';
import { braceify, stringify, stringifyWithColon } from './params';

@Pipe({
  name: 'keywordParams',
})
export class KeywordParamsPipe implements PipeTransform {
  transform(value: Command): string {
    if (!value.num_params) {
      return '';
    }
    const input = value?.input ?? [];
    const output = value?.output ?? [];
    return stringify([...input, ...output], ' ', (p: Param) =>
      braceify(stringifyWithColon(p), '[]')
    );
  }
}

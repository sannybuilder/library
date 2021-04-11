import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { template } from 'lodash';
import { braceify, stringifyWithColon } from './params';

@Pipe({
  name: 'parametrify',
})
export class ParametrifyPipe implements PipeTransform {
  transform(snippet: string, command: Command): string {
    const compiled = template(snippet);
    const stringify = (key: 'input' | 'output') =>
      (command[key] ?? []).reduce((m, v, i) => {
        m[key + (i + 1)] = braceify(stringifyWithColon(v), '[]');
        return m;
      }, {} as Record<string, string>);

    try {
      return compiled({
        ...stringify('input'),
        ...stringify('output'),
      });
    } catch {
      return '[invalid code snippet]';
    }
  }
}

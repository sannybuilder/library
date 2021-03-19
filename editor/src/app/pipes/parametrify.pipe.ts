import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { template } from 'lodash';

@Pipe({
  name: 'parametrify',
})
export class ParametrifyPipe implements PipeTransform {
  transform(snippet: string, command: Command): string {
    const compiled = template(snippet);
    const stringify = (key: 'input' | 'output') =>
      (command[key] ??= []).reduce((m, v, i) => {
        m[key + (i + 1)] = `[${v.name}: ${v.type}]`;
        return m;
      }, {} as Record<string, string>);
    return compiled({
      ...stringify('input'),
      ...stringify('output'),
    });
  }
}

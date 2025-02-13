import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { stringifyCommandWithOperator } from '../utils';

@Pipe({
    name: 'expressify',
    standalone: false
})
export class ExpressifyPipe implements PipeTransform {
  transform(command: Command): string {
    return stringifyCommandWithOperator(
      command,
      (_, i) => `<%= input${i + 1} %>`,
      (_, i) => `<%= output${i + 1} %>`
    );
  }
}

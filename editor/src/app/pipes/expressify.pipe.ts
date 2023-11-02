import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { inputParams, outputParams } from '../utils';

@Pipe({
  name: 'expressify',
})
export class ExpressifyPipe implements PipeTransform {
  transform(command: Command): string {
    const output = outputParams(command);
    const input = inputParams(command);

    if (input.length == 1 && !output.length) {
      // unary
      return `${command.operator}<%= input1 %>`;
    }
    if (output.length) {
      // binary not
      if (command.operator === '~') {
        return `<%= output1 %> = ~<%= input1 %>`;
      }

      // ternary
      return `<%= output1 %> = <%= input1 %> ${command.operator} <%= input2 %>`;
    }

    switch (command.operator) {
      // assignment or comparison
      case '=':
      case '+=@':
      case '-=@':
      case '=#':
      case '==':
      case '>':
      case '>=': {
        return `<%= input1 %> ${command.operator} <%= input2 %>`;
      }

      // compound assignment
      default: {
        return `<%= input1 %> ${command.operator}= <%= input2 %>`;
      }
    }
  }
}

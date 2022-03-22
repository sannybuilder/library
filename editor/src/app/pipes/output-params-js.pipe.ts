import { Pipe, PipeTransform } from '@angular/core';
import { Command, SourceType } from '../models';
import { outputParams } from '../utils';

@Pipe({
  name: 'outputParamsJs',
})
export class OutputParamsJsPipe implements PipeTransform {
  transform(command: Command): string {
    if (!command.num_params) {
      return '';
    }
    const output = outputParams(command);

    if (output.length === 1) {
      return `var ${output[0].name}`;
    }
    return 'var result';
  }
}

/*
     braceify(
        stringify(output, ', ', (p) =>
          stringifyWithColon({ ...p, source: SourceType.any, type: '' })
        ),
        '{}'
      )

      */

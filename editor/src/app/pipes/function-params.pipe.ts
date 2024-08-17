import { Pipe, PipeTransform } from '@angular/core';
import { Command, Game, PrimitiveType, ViewContext } from '../models';
import { inputParams, outputParams, primitiveTypes } from '../utils';
import { braceify, stringify, stringifyWithColonNoHighlight } from './params';

@Pipe({
  name: 'functionParams',
})
export class FunctionParamsPipe implements PipeTransform {
  transform(command: Command, game: Game, simpleTypes: boolean): string {
    let params = '()';
    let primitives = primitiveTypes(game, ViewContext.Code);
    if (command.input?.length) {
      params = braceify(
        stringify(
          inputParams(command).map((p) => {
            if (primitives.includes(p.type as PrimitiveType) || !simpleTypes) {
              return p;
            }
            return { ...p, type: `int {${p.type}}` };
          }),
          ', ',
          stringifyWithColonNoHighlight
        ),
        '()'
      );
    }

    if (command.output?.length) {
      params = params + ': ';

      return (
        params +
        outputParams(command)
          .map((p) => {
            if (primitives.includes(p.type as PrimitiveType) || !simpleTypes) {
              return p.type;
            }
            return `int {${p.type}}`;
          })
          .join(', ')
      );
    }

    return params;
  }
}

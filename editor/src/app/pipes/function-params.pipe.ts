import { Pipe, PipeTransform } from '@angular/core';
import {
  Command,
  Game,
  Param,
  PrimitiveType,
  SourceType,
  ViewContext,
} from '../models';
import { inputParams, outputParams, primitiveTypes } from '../utils';
import {
  braceify,
  stringify,
  stringifyWithColonNoHighlight,
} from './params';
import { without } from 'lodash';

@Pipe({
  name: 'functionParams',
})
export class FunctionParamsPipe implements PipeTransform {
  transform(command: Command, game: Game, simpleTypes: boolean): string {
    let params = '()';
    let primitives = without(
      primitiveTypes(game, ViewContext.Code),
      PrimitiveType.boolean
    );
    if (command.input?.length) {
      params = braceify(
        stringify(
          inputParams(command).map((p) => {
            const isSimpleType =
              !simpleTypes || primitives.includes(p.type as PrimitiveType);
            return this.paramCStyle(p, isSimpleType);
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
            const isSimpleType =
              !simpleTypes || primitives.includes(p.type as PrimitiveType);
            return this.paramCStyle(p, isSimpleType).type;
          })
          .join(', ')
      );
    }

    return params;
  }

  paramCStyle(p: Param, isSimpleType: boolean): Param {
    const type = p.source === SourceType.pointer ? p.type + '*' : p.type;

    if (!isSimpleType || p.source === SourceType.pointer) {
      return { name: p.name, type: `int {${type}}` };
    }
    return { name: p.name, type };
  }
}

import { without } from 'lodash';
import {
  Command,
  Game,
  Param,
  PrimitiveType,
  SourceType,
  ViewContext,
} from '../models';
import {
  braceify,
  stringify,
  stringifyWithColonNoHighlight,
} from '../pipes/params';
import { primitiveTypes, inputParams, outputParams } from './command';

export function generateFunctionDeclaration(
  command: Command,
  game: Game
): string {
  if (!command.member) {
    return '';
  }

  let declaration = 'function ';
  declaration += functionName(command);

  if (command.cc && command.name) {
    declaration += `<${command.cc}, ${command.name}>`;
  }

  declaration += functionParamList(command, game, true);

  return declaration;
}

export function functionParamList(
  command: Command,
  game: Game,
  simpleTypes: boolean
): string {
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
          return paramCStyle(p, isSimpleType);
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
          return paramCStyle(p, isSimpleType).type;
        })
        .join(', ')
    );
  }

  return params;
}

function paramCStyle(p: Param, isSimpleType: boolean): Param {
  const type = p.source === SourceType.pointer ? p.type + '*' : p.type;

  if (!isSimpleType || p.source === SourceType.pointer) {
    return { name: p.name, type: `int {${type}}` };
  }
  return { name: p.name, type };
}

export function functionName(command: Command): string {
  return [command.class, command.member].filter(Boolean).join('_')
}
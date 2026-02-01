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

export function generateFunctionDeclaration(command: Command, game: Game) {
  if (!command.member) {
    return '';
  }
  let declaration = '';

  if (command.short_desc) {
    declaration += `/// ${command.short_desc}\n`;
  }
  declaration += 'function ';
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
  simpleTypes: boolean,
): string {
  let params = '()';
  let primitives = without(
    primitiveTypes(game, ViewContext.Code),
    PrimitiveType.boolean,
    PrimitiveType.model_any,
    PrimitiveType.model_char,
    PrimitiveType.model_object,
    PrimitiveType.model_vehicle,
  );
  if (command.input?.length) {
    params = braceify(
      stringify(
        inputParams(command).map((p) => {
          const isSimpleType =
            !simpleTypes || primitives.includes(p.type as PrimitiveType);
          return paramCStyle(p, isSimpleType, '{', '}');
        }),
        ', ',
        stringifyWithColonNoHighlight,
      ),
      '()',
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
          return paramCStyle(p, isSimpleType, '{', '}').type;
        })
        .join(', ')
    );
  }

  return params;
}

export function functionGenericParamsList(command: Command, game: Game) {
  let params: string = '[]';
  let primitives = without(
    primitiveTypes(game, ViewContext.Code),
    PrimitiveType.boolean,
    PrimitiveType.model_any,
    PrimitiveType.model_char,
    PrimitiveType.model_object,
    PrimitiveType.model_vehicle,
  );
  if (command.input?.length) {
    params = braceify(
      stringify(
        inputParams(command).map((p) => {
          if (p.type === 'bool') {
            // bool is supported in TS
            return paramCStyle({ name: p.name, type: 'boolean' }, true, '/*', '*/');
          }
          if (p.type === 'float') {
            return {
              name: p.name,
              type: 'float /* Wrap in Memory.FromFloat */',
            };
          }
          const isSimpleType = primitives.includes(p.type as PrimitiveType);
          return paramCStyle(p, isSimpleType, '/*', '*/');
        }),
        ', ',
        stringifyWithColonNoHighlight,
      ),
      '[]',
    );
  }

  return params;
}

function paramCStyle(
  p: Param,
  isSimpleType: boolean,
  openComment: '{' | '/*',
  closeComment: '}' | '*/',
): Param {
  const type = p.source === SourceType.pointer ? p.type + '*' : p.type;

  if (!isSimpleType || p.source === SourceType.pointer) {
    return { name: p.name, type: `int ${openComment}${type}${closeComment}` };
  }
  return { name: p.name, type };
}

export function functionName(command: Command): string {
  return [command.class, command.member].filter(Boolean).join('_');
}

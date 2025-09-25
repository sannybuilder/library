import { forEach, trim, partition } from 'lodash';
import {
  commandParams,
  getDefaultCommandNameFormatter,
  formatOpcode,
  formatParamName,
  capitalizeFirst,
  doesCommandHaveAnyAttributeInvalid,
  doesCommandHaveDuplicateName,
  doesCommandHaveDuplicateParamName,
  doesCommandHaveEmptyId,
  doesCommandHaveEmptyName,
  doesCommandHaveMissingSelfParamInMethod,
  doesCommandHaveSelfInStaticMethod,
  doesConstructorCommandHaveNoOutputParams,
  doesGetterCommandReturnNothing,
  doesCommandDescriptionHaveTrailingPeriod,
  doesCommandDescriptionNotStartWith3rdPersonVerb,
  doesConstructorNotReturnHandle,
  doesGameRequireOpcode,
  doesCommandHaveInvalidOpcode,
  doesCommandHaveOutOfRangeOpcode,
  doesCommandHaveAnInvalidClassName,
  doesCommandHaveAnInvalidMethodName,
  doesCommandHaveInvalidConditionalOperator,
  doesCommandHaveInvalidArgumentWithOperator,
  doesSelfArgumentHaveInvalidType,
  doesOutputHaveInvalidSource,
  wrongConstructorType,
  doesScriptCommandHaveEmptyMember,
  doesCommandHaveInvalidArguments,
  outputParams,
} from './src/app/utils';
import { Command, Game, LoadExtensionsResponse, Param } from './src/app/models';

export function run(inputFile: string, game: Game) {
  console.log(`Validating commands in ${inputFile}`);

  const { readFileSync } = require('fs');
  const file = readFileSync(inputFile);
  const content: LoadExtensionsResponse = JSON.parse(file);
  const translationFile = readFileSync('./src/assets/i18n/en.json');
  const translations = JSON.parse(translationFile);

  let exitStatus = 0;

  const noopHandler = () => false;
  const isOpcodeRequired = doesGameRequireOpcode(game as Game);
  const commandNameFormatter = getDefaultCommandNameFormatter(game as Game);

  const errorHandlers = {
    invalidAttributeCombo: doesCommandHaveAnyAttributeInvalid,
    duplicateParamName: doesCommandHaveDuplicateParamName,
    duplicateName: doesCommandHaveDuplicateName,
    noConstructorWithoutOutputParams: doesConstructorCommandHaveNoOutputParams,
    noGetterWithoutResult: doesGetterCommandReturnNothing,
    emptyName: doesCommandHaveEmptyName,
    emptyOpcode: isOpcodeRequired ? doesCommandHaveEmptyId : noopHandler,
    invalidOpcode: isOpcodeRequired
      ? doesCommandHaveInvalidOpcode
      : noopHandler,
    outOfRangeOpcode: isOpcodeRequired
      ? doesCommandHaveOutOfRangeOpcode
      : noopHandler,
    noSelfInStaticMethod: doesCommandHaveSelfInStaticMethod,
    missingSelfParamInMethod: doesCommandHaveMissingSelfParamInMethod,
    trailingPeriodInDescription: doesCommandDescriptionHaveTrailingPeriod,
    no3rdPersonVerb: doesCommandDescriptionNotStartWith3rdPersonVerb,
    constructorNotReturningHandle: doesConstructorNotReturnHandle,
    invalidClassName: doesCommandHaveAnInvalidClassName,
    invalidMethodName: doesCommandHaveAnInvalidMethodName,
    invalidConditionalOperator: doesCommandHaveInvalidConditionalOperator,
    invalidArgumentWithOperator: doesCommandHaveInvalidArgumentWithOperator,
    invalidSelfType: doesSelfArgumentHaveInvalidType,
    invalidOutputSource: doesOutputHaveInvalidSource,
    emptyMember: doesScriptCommandHaveEmptyMember,
    // invalidArguments: doesCommandHaveInvalidArguments,
    // invalidInputSource: doesInputHaveInvalidSource,
  };

  forEach(content.extensions, (extension) => {
    forEach(extension.commands, (command) => {
      Object.entries(errorHandlers).forEach(([key, cb]) => {
        if (cb(command, extension.commands)) {
          console.error(
            `Error: ${translations?.ui?.errors?.command?.[key]}, name: ${command.name}, extension: ${extension.name}`
          );
          exitStatus = 1;
        }
      });
      validateFormatting(command, extension.name);

      if (wrongConstructorType(command, content.classes)) {
        console.error(
          `Error: constructor type must match the class type, command: ${command.name}, extension: ${extension.name}`
        );
        exitStatus = 1;
      }

      if (doesCommandHaveInvalidArguments(command, game)) {
        console.error(
          `Error: ${translations?.ui?.errors?.command?.['invalidArguments']}, name: ${command.name}, extension: ${extension.name}`
        );
        exitStatus = 1;
      }
    });
  });

  // collect all classes
  const constructableClasses = new Set<string>();
  const classNames = new Set<string>();

  forEach(content.extensions, (extension) => {
    forEach(extension.commands, (command) => {
      if (command.attrs?.is_constructor && command.class) {
        const outputs = outputParams(command);
        if (outputs[0]?.type === command.class) {
          constructableClasses.add(command.class);
        }
      }
      if (command.class) {
        classNames.add(command.class);
      }
    });
  });

  forEach(content.classes, (cls) => {
    if (!classNames.has(cls.name)) {
      console.error(`Error: can't find any command for the class ${cls.name}`);
      exitStatus = 1;
    }
    if (cls.extends) {
      constructableClasses.add(cls.extends);
    }
  });

  for (const cls of classNames) {
    if (!content.classes.find(({ name }) => name === cls)) {
      console.error(`Error: can't find the class definition for ${cls}`);
      exitStatus = 1;
    }
  }

  const [cons, notCons] = partition(
    content.classes,
    (cls) => cls.constructable
  );
  forEach(cons, ({ name, extends: extends_ }) => {
    if (!constructableClasses.has(name)) {
      if (extends_) {
        if (!classNames.has(extends_)) {
          console.error(
            `Error: can't find the class definition for ${extends_}`
          );
          exitStatus = 1;
        }
        const extends_cls = content.classes.find(
          (cls) => cls.name === extends_
        );
        if (extends_cls?.constructable) {
          return;
        }
      }
      console.error(
        `Error: can't find a constructor for the constructable class ${name}`
      );
      exitStatus = 1;
    }
  });
  forEach(notCons, ({ name, extends: extends_ }) => {
    if (constructableClasses.has(name)) {
      console.error(
        `Error: a constructable class ${name} has not been defined as constructable`
      );
      exitStatus = 1;
    }

    if (extends_) {
      console.error(`Error: a derived class ${name} must be constructable`);
      exitStatus = 1;
    }
  });

  if (exitStatus) {
    process.exit(exitStatus);
  }

  function validateFormatting(command: Command, extension: string): void {
    if (trim(commandNameFormatter(command.name)) !== command.name) {
      console.error(
        `Error: command name is not properly formatted, expected ${trim(
          commandNameFormatter(command.name)
        )}, command: ${command.name}, extension: ${extension}`
      );
      exitStatus = 1;
    }

    if (isOpcodeRequired && trim(formatOpcode(command.id!)) !== command.id) {
      console.error(
        `Error: command id is not properly formatted, expected ${trim(
          formatOpcode(command.id!)
        )}, command: ${command.name}, extension: ${extension}`
      );
      exitStatus = 1;
    }

    if (command.class) {
      if (trim(capitalizeFirst(command.class)) !== command.class) {
        console.error(
          `Error: class name is not properly formatted, expected ${trim(
            capitalizeFirst(command.class)
          )}, command: ${command.name}, extension: ${extension}`
        );
        exitStatus = 1;
      }
    }

    if (command.member) {
      if (trim(capitalizeFirst(command.member)) !== command.member) {
        console.error(
          `Error: class member is not properly formatted, expected ${trim(
            capitalizeFirst(command.member)
          )}, command: ${command.name}, extension: ${extension}`
        );
        exitStatus = 1;
      }
    }

    if (isNaN(+command.num_params)) {
      console.error(
        `Error: num_params must be a number, command: ${command.name}, extension: ${extension}`
      );
      exitStatus = 1;
    }

    const params = commandParams(command);

    if (params.length !== command.num_params) {
      console.error(
        `Error: num_params must be equal to the sum of input and output parameters, command: ${command.name}, extension: ${extension}`
      );
      exitStatus = 1;
    }

    params.forEach((param: Param) => {
      if (trim(formatParamName(param.name)) !== param.name) {
        console.error(
          `Error: param name is not properly formatted, expected ${trim(
            formatParamName(param.name)
          )}, command: ${command.name}, extension: ${extension}`
        );
        exitStatus = 1;
      }
      if (!param.type) {
        console.error(
          `Error: param type must be defined, command: ${command.name}, extension: ${extension}`
        );
        exitStatus = 1;
      }
    });
  }
}

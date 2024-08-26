import { forEach, trim } from 'lodash';
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
} from './src/app/utils';
import { Command, Game, LoadExtensionsResponse, Param } from './src/app/models';

const { readFileSync } = require('fs');
const [inputFile, game] = process.argv.slice(2);
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
  noGetterWithoutResult:
    game === Game.gta_iv ? noopHandler : doesGetterCommandReturnNothing,
  emptyName: doesCommandHaveEmptyName,
  emptyOpcode: isOpcodeRequired ? doesCommandHaveEmptyId : noopHandler,
  invalidOpcode: isOpcodeRequired ? doesCommandHaveInvalidOpcode : noopHandler,
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
  });
});

process.exit(exitStatus);

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

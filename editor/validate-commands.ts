import { forEach, trim } from 'lodash';
import {
  commandParams,
  formatCommandName,
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
  doesCommandDescriptionHaveTrailingPeriod,
  doesCommandDescriptionNotStartWith3rdPersonVerb,
  doesConstructorNotReturnHandle,
  doesVariadicCommandNotHaveArgumentsParameter
} from './src/app/utils';
import { Command, LoadExtensionsResponse, Param } from './src/app/models';

const { readFileSync } = require('fs');
const [inputFile] = process.argv.slice(2);
const file = readFileSync(inputFile);
const content: LoadExtensionsResponse = JSON.parse(file);
const translationFile = readFileSync('./src/assets/i18n/en.json');
const translations = JSON.parse(translationFile);

let exitStatus = 0;

const errorHandlers = {
  invalidAttributeCombo: doesCommandHaveAnyAttributeInvalid,
  duplicateParamName: doesCommandHaveDuplicateParamName,
  duplicateName: doesCommandHaveDuplicateName,
  noConstructorWithoutOutputParams: doesConstructorCommandHaveNoOutputParams,
  emptyName: doesCommandHaveEmptyName,
  emptyOpcode: doesCommandHaveEmptyId,
  noSelfInStaticMethod: doesCommandHaveSelfInStaticMethod,
  missingSelfParamInMethod: doesCommandHaveMissingSelfParamInMethod,
  trailingPeriodInDescription: doesCommandDescriptionHaveTrailingPeriod,
  no3rdPersonVerb: doesCommandDescriptionNotStartWith3rdPersonVerb,
  constructorNotReturningHandle: doesConstructorNotReturnHandle,
  variadicNotHavingArguments: doesVariadicCommandNotHaveArgumentsParameter
};

forEach(content.extensions, (extension) => {
  forEach(extension.commands, (command) => {
    Object.entries(errorHandlers).forEach(([key, cb]) => {
      if (cb(command, extension.commands)) {
        console.error(
          `Error: ${translations?.ui?.errors?.command?.[key]}, id: ${command.id}, extension: ${extension.name}`
        );
        exitStatus = 1;
      }
    });
    validateFormatting(command, extension.name);
  });
});

process.exit(exitStatus);

function validateFormatting(command: Command, extension: string): void {
  if (trim(formatCommandName(command.name)) !== command.name) {
    console.error(
      `Error: command name is not properly formatted, expected ${trim(
        formatCommandName(command.name)
      )}, id: ${command.id}, extension: ${extension}`
    );
    exitStatus = 1;
  }

  if (trim(formatOpcode(command.id)) !== command.id) {
    console.error(
      `Error: command id is not properly formatted, expected ${trim(
        formatOpcode(command.id)
      )}, id: ${command.id}, extension: ${extension}`
    );
    exitStatus = 1;
  }

  if (command.class) {
    if (trim(capitalizeFirst(command.class)) !== command.class) {
      console.error(
        `Error: class name is not properly formatted, expected ${trim(
          capitalizeFirst(command.class)
        )}, id: ${command.id}, extension: ${extension}`
      );
      exitStatus = 1;
    }
  }

  if (command.member) {
    if (trim(capitalizeFirst(command.member)) !== command.member) {
      console.error(
        `Error: class member is not properly formatted, expected ${trim(
          capitalizeFirst(command.member)
        )}, id: ${command.id}, extension: ${extension}`
      );
      exitStatus = 1;
    }
  }

  if (isNaN(+command.num_params)) {
    console.error(
      `Error: num_params must be a number, id: ${command.id}, extension: ${extension}`
    );
    exitStatus = 1;
  }

  commandParams(command).forEach((param: Param) => {
    if (trim(formatParamName(param.name)) !== param.name) {
      console.error(
        `Error: param name is not properly formatted, expected ${trim(
          formatParamName(param.name)
        )}, id: ${command.id}, extension: ${extension}`
      );
      exitStatus = 1;
    }
    if (!param.type) {
      console.error(
        `Error: param type must be defined, id: ${command.id}, extension: ${extension}`
      );
      exitStatus = 1;
    }
  });
}

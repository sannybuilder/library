import { toPairs, trim } from 'lodash';
import { EnumRaw } from 'src/app/models';
import {
  capitalizeFirst,
  doesEnumHaveDuplicateField,
  doesEnumHaveEmptyName,
  doesEnumHaveOneEmptyField,
  isEmptyEnum,
} from './src/app/utils';

const { readFileSync } = require('fs');
const [inputFile] = process.argv.slice(2);
const file = readFileSync(inputFile);
const content: Record<
  string,
  Record<string, number | string | null>
> = JSON.parse(file);
const translationFile = readFileSync('./src/assets/i18n/en.json');
const translations = JSON.parse(translationFile);

let exitStatus = 0;

const errorHandlers = {
  emptyEnumName: doesEnumHaveEmptyName,
  emptyFieldName: doesEnumHaveOneEmptyField,
  duplicateFieldName: doesEnumHaveDuplicateField,
  emptyEnum: isEmptyEnum,
};

Object.entries(content).forEach(([enumName, enumFields]) => {
  const enumRaw: EnumRaw = {
    name: enumName,
    fields: toPairs(enumFields),
    isNew: false,
  };
  Object.entries(errorHandlers).forEach(([key, cb]) => {
    if (cb(enumRaw)) {
      console.error(
        `Error: ${translations?.ui?.errors?.enum?.[key]}, enum: '${enumName}'`
      );
      exitStatus = 1;
    }
  });
  validateEnumName(enumName);
  Object.entries(enumFields).forEach(([fieldName, fieldValue]) => {
    validateField(fieldName, fieldValue, enumName);
  });
});

process.exit(exitStatus);

function validateEnumName(name: string) {
  if (capitalizeFirst(trim(name)) !== name) {
    console.error(
      `Error: enum name is not properly formatted, expected '${capitalizeFirst(
        trim(name)
      )}', enum: '${name}'`
    );
    exitStatus = 1;
  }
}

function validateField(
  name: string,
  value: string | number | null,
  enumName: string
) {
  if (trim(name) !== name) {
    console.error(
      `Error: field name is not properly formatted, expected '${capitalizeFirst(
        trim(name)
      )}', enum: '${enumName}', field: '${name}'`
    );
    exitStatus = 1;
  }

  if (
    !(typeof value === 'string' || typeof value === 'number' || value === null)
  ) {
    console.error(
      `Error: field value has unknown type, expected 'string', 'number', or 'null', enum: '${enumName}', field: '${name}'`
    );
    exitStatus = 1;
  }

  if (typeof value === 'string' && trim(value) !== value) {
    console.error(
      `Error: field value is not properly formatted, expected ${capitalizeFirst(
        trim(value)
      )}, enum: '${enumName}', field: '${name}'`
    );
    exitStatus = 1;
  }
}

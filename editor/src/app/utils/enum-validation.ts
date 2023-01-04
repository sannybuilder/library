import { EnumRaw } from '../models';
import { isFieldNameDuplicate } from './enum';

export function doesEnumHaveEmptyName(enumRaw: EnumRaw) {
  return !enumRaw.name;
}

export function doesEnumHaveOneEmptyField(enumRaw: EnumRaw) {
  return enumRaw.fields.some(([name]) => !name);
}

export function doesEnumHaveDuplicateField(enumRaw: EnumRaw) {
  return enumRaw.fields.some(([name]) => isFieldNameDuplicate(name, enumRaw));
}

export function doesEnumNameConflict(enumName: string, names: string[]) {
  return names.includes(enumName);
}

export function doesEnumHaveInvalidName(enumRaw: EnumRaw) {
  return !isValidIdentifier(enumRaw.name);
}

export function doesEnumHaveInvalidFieldName(enumRaw: EnumRaw) {
  return enumRaw.fields.some(([name]) => !isValidIdentifier(name));
}

export function isValidIdentifier(str: string) {
  return /^[a-z_$][a-z0-9_$]*$/i.test(str);
}
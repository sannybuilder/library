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

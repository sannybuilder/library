import { EnumRaw } from '../models';

export const isStringEnum = (fields: EnumRaw['fields']) => {
  return fields.some(([_, val]) => {
    return typeof val === 'string' && val.length > 0 && isNaN(+val);
  });
};

export const evaluateEnumValues = (
  fields: EnumRaw['fields']
): EnumRaw['fields'] => {
  const shouldAllFieldsBeStrings = isStringEnum(fields);
  return fields.map((f) => {
    if (f[1] === null) {
      return f;
    }
    const curVal = f[1].toString();

    // convert value to string or number depending on type of enum
    // one non-numeric value makes every values non-numeric
    if (!shouldAllFieldsBeStrings && curVal.length && !isNaN(+curVal)) {
      return [f[0], +curVal];
    } else {
      return [f[0], curVal];
    }
  });
};

export function isFieldNameDuplicate(fieldName: string, enumRaw: EnumRaw) {
  return (
    !!fieldName &&
    enumRaw.fields.filter(([name]) => fieldName === name).length > 1
  );
}

export function isEmptyEnum(enumRaw: EnumRaw) {
  return enumRaw.fields.length === 0;
}

function evaluateValue(index: number, fields: EnumRaw['fields']): number {
  const val = fields[index][1];

  if (index === 0 || val) {
    return parseInt(val?.toString() || '0', 10);
  }

  return evaluateValue(index - 1, fields) + 1;
}

export function fillEnumValues(fields: EnumRaw['fields']): EnumRaw['fields'] {
  const shouldAllFieldsBeStrings = isStringEnum(fields);
  return fields.map((f, index) => {
    if (f[1] === null) {
      const val = shouldAllFieldsBeStrings ? '' : evaluateValue(index, fields);
      return [f[0], val];
    }
    const curVal = f[1].toString();

    // convert value to string or number depending on type of enum
    // one non-numeric value makes every values non-numeric
    if (!shouldAllFieldsBeStrings && curVal.length && !isNaN(+curVal)) {
      return [f[0], +curVal];
    } else {
      return [f[0], curVal];
    }
  });
}

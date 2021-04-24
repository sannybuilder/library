import { camelCase } from 'lodash';

export const capitalizeFirst = (value?: string) => {
  const camelized = camelCase(value);
  return camelized.length > 0
    ? camelized[0].toUpperCase() + camelized.substring(1)
    : camelized;
};

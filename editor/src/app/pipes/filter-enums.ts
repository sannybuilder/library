import { Pipe, PipeTransform } from '@angular/core';
import { fillEnumValues } from '../utils';

@Pipe({
  name: 'filterEnums',
  standalone: false,
})
export class FilterEnumsPipe implements PipeTransform {
  constructor() {}

  transform(fields: Array<[string, string]>, needle: string) {
    const autoValues = fillEnumValues(fields);
    return fields.filter(([name, value], index) => {
      if (!needle) {
        return true;
      }

      if (name?.toLowerCase().includes(needle.toLowerCase())) {
        return true;
      }

      if (value !== null) {
        if (value.toString().toLowerCase().includes(needle.toLowerCase())) {
          return true;
        }
      } else {
        const autoValue = autoValues[index]?.[1] ?? '';
        if (autoValue.toString().toLowerCase().includes(needle.toLowerCase())) {
          return true;
        }
      }

      return false;
    });
  }
}

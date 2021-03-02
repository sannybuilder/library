import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';

@Pipe({ name: 'attrFilter' })
export class AttrFilterPipe implements PipeTransform {
  transform(elements: Command[], filters: string[]) {
    return elements.filter((element) =>
      filters.every((filter) => element.attrs[filter])
    );
  }
}

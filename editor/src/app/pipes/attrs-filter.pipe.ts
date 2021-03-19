import { Pipe, PipeTransform } from '@angular/core';
import { Command, Attribute } from '../models';

@Pipe({ name: 'attrFilter' })
export class AttrFilterPipe implements PipeTransform {
  transform(elements: Command[], only: Attribute[], except: Attribute[]) {
    return elements.filter(
      (element) =>
        only.every((filter) => element.attrs?.[filter]) &&
        !except.some((filter) => element.attrs?.[filter])
    );
  }
}

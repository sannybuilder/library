import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';

@Pipe({ name: 'attrFilter' })
export class AttrFilterPipe implements PipeTransform {
  transform(elements: Command[], only: string[], except: string[]) {
    return elements.filter(
      (element) =>
        only.every((filter) => element.attrs[filter]) &&
        !except.some((filter) => element.attrs[filter])
    );
  }
}

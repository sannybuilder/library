import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';

@Pipe({
    name: 'filterMethods',
    standalone: false
})
export class FilterMethodsPipe implements PipeTransform {
  constructor() {}

  transform(
    items: Array<{ command: Command; extension: string }>,
    needle: string
  ) {
    return items.filter(
      ({ command }) =>
        !needle || command.member?.toLowerCase().includes(needle.toLowerCase())
    );
  }
}

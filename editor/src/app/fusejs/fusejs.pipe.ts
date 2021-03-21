import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { search } from './fusejs';

@Pipe({ name: 'fusejs' })
export class FusejsPipe implements PipeTransform {
  transform(elements: Command[], searchTerms: string) {
    return search(elements, searchTerms);
  }
}

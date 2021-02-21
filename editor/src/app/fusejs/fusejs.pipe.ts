import { Pipe, PipeTransform } from '@angular/core';
import { FusejsService, AngularFusejsOptions } from './fusejs.service';

@Pipe({ name: 'fusejs' })
export class FusejsPipe implements PipeTransform {
  constructor(private FusejsService: FusejsService) {}

  transform(
    elements: Array<Object>,
    searchTerms: string,
    options: AngularFusejsOptions = {}
  ) {
    return this.FusejsService.searchList(elements, searchTerms, options);
  }
}

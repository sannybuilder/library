import { Pipe, PipeTransform } from '@angular/core';
import { Param } from '../models';
import { stringify } from './params';

@Pipe({
    name: 'singleParam',
    standalone: false
})
export class SingleParamPipe implements PipeTransform {
  transform(value: Param): string {
    return stringify([value], ' ');
  }
}

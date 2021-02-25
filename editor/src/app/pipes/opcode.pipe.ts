import { Pipe, PipeTransform } from '@angular/core';
import { opcodify } from './opcodify';

@Pipe({
  name: 'opcode',
})
export class OpcodePipe implements PipeTransform {
  transform(value: number): string {
    return opcodify(value.toString(16));
  }
}

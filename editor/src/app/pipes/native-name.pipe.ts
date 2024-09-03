import { Pipe, PipeTransform } from '@angular/core';
import { Command } from '../models';
import { PropExtractPipe } from './prop-extract.pipe';

@Pipe({
  name: 'nativeName',
})
export class NativeNamePipe implements PipeTransform {
  transform(command: Command): string {
    const extractor = new PropExtractPipe();
    const className = extractor.transform(command, 'class');
    const memberName = extractor.transform(command, 'member');
    return [className, memberName].filter(Boolean).join('::');
  }
}

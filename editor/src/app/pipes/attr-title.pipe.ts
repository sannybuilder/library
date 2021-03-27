import { Pipe, PipeTransform } from '@angular/core';
import { Attribute } from '../models';

@Pipe({
  name: 'attrTitle',
})
export class AttrTitlePipe implements PipeTransform {
  transform(value: Attribute): string {
    switch (value) {
      case 'is_branch':
        return 'This command is used to branch the code';
      case 'is_condition':
        return 'This command can be used in conditional statements';
      case 'is_constructor':
        return 'This command is used to create a new in-game entity';
      case 'is_destructor':
        return 'This command is used to delete the in-game entity';
      case 'is_keyword':
        return 'This command is used as a single keyword followed by arguments';
      case 'is_nop':
        return 'This command is a no-operation';
      case 'is_unsupported':
        return 'This command is unsupported in the given game and its usage is forbidden';
      case 'is_overload':
        return 'This command has multiple variations for different types of arguments';
      case 'is_segment':
        return 'This command is used to separate segments in SCM header';
      case 'is_static':
        return 'This command operates on a static property or in-an game entity that can not be constructed dynamically';
      case 'is_variadic':
        return 'This command has variadic number of arguments';
    }
  }
}

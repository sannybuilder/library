import { Pipe, PipeTransform } from '@angular/core';
import { Command, Game } from '../models';
import { functionGenericParamsList } from '../utils';

@Pipe({
    name: 'functionGeneric',
    standalone: false
})
export class FunctionGenericPipe implements PipeTransform {
  transform(command: Command, game: Game): string {
    return functionGenericParamsList(command, game);
  }
}

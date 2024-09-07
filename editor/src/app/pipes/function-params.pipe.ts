import { Pipe, PipeTransform } from '@angular/core';
import { Command, Game } from '../models';
import { functionParamList } from '../utils';

@Pipe({
  name: 'functionParams',
})
export class FunctionParamsPipe implements PipeTransform {
  transform(command: Command, game: Game, simpleTypes: boolean): string {
    return functionParamList(command, game, simpleTypes);
  }
}

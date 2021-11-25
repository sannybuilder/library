import { Pipe, PipeTransform } from '@angular/core';
import { GameName, GameTitleSimple } from '../models';

@Pipe({
  name: 'gameTitleSimple',
})
export class GameTitleSimplePipe implements PipeTransform {
  transform(gameName: GameName): string {
    return GameTitleSimple[gameName] ?? '';
  }
}

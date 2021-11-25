import { Pipe, PipeTransform } from '@angular/core';
import { GameName, GameTitle } from '../models';

@Pipe({
  name: 'gameTitle',
})
export class GameTitlePipe implements PipeTransform {
  transform(gameName: GameName): string {
    return GameTitle[gameName] ?? '';
  }
}

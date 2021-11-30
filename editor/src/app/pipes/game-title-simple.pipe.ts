import { Pipe, PipeTransform } from '@angular/core';
import { Game, GameTitleSimple } from '../models';

@Pipe({
  name: 'gameTitleSimple',
})
export class GameTitleSimplePipe implements PipeTransform {
  transform(game: Game): string {
    return GameTitleSimple[game] ?? '';
  }
}

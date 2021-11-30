import { Pipe, PipeTransform } from '@angular/core';
import { Game, GameTitle } from '../models';

@Pipe({
  name: 'gameTitle',
})
export class GameTitlePipe implements PipeTransform {
  transform(game: Game): string {
    return GameTitle[game] ?? '';
  }
}

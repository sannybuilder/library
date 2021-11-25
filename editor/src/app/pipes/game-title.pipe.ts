import { Pipe, PipeTransform } from '@angular/core';
import { Game, GameTitle } from '../models';

@Pipe({
  name: 'gameTitle',
})
export class GameTitlePipe implements PipeTransform {
  transform(gameName: string): string {
    return GameTitle[gameName] ?? '';
  }
}

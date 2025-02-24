import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models';

@Component({
    selector: 'scl-enum-games',
    templateUrl: './enum-games.component.html',
    styleUrls: ['./enum-games.component.scss'],
    standalone: false
})
export class EnumGamesComponent {
  @Input() games: Game[];
  @Input() enumName: string;

  getGameLinks() {
    return this.games.map(game => ({ game, route: ['/', game, 'enums', this.enumName]}))
  }
}

import { Component, Input } from '@angular/core';
import { Game } from '../../../models';

@Component({
    selector: 'scl-enum-list',
    templateUrl: './enum-list.component.html',
    styleUrls: ['./enum-list.component.scss'],
    standalone: false
})
export class EnumListComponent {
  private _game: Game;
  games: Game[];
  @Input() enumNames: string[];
  @Input() extensionTypes: string[];
  @Input() set game(val: Game) {
    this.games = Object.values(Game);
    this._game = val;
  }

  filterQuery = '';

  get game() {
    return this._game;
  }

  isUnused(enumName: string) {
    return this.extensionTypes?.length && !this.extensionTypes.includes(enumName);
  }
}

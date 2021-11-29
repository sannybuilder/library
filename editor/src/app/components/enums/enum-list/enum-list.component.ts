import { Component, Input } from '@angular/core';
import { getSamePlatformAndVersion } from '../../../utils';
import { Game } from '../../../models';

@Component({
  selector: 'scl-enum-list',
  templateUrl: './enum-list.component.html',
  styleUrls: ['./enum-list.component.scss'],
})
export class EnumListComponent {
  private _game: Game;
  games: Game[];
  @Input() enumNames: string[];
  @Input() set game(val: Game) {
    this.games = getSamePlatformAndVersion(val);
    this._game = val;
  }

  get game() {
    return this._game;
  }
}

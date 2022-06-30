import { Component, Input } from '@angular/core';
import { Extension, Game } from 'src/app/models';

@Component({
  selector: 'scl-extension-list',
  templateUrl: './extension-list.component.html',
  styleUrls: ['./extension-list.component.scss'],
})
export class ExtensionListComponent {
  private _game: Game;
  games: Game[];

  @Input() extensions: Extension[];

  @Input() set game(val: Game) {
    this.games = Object.values(Game);
    this._game = val;
  }

  get game() {
    return this._game;
  }
}

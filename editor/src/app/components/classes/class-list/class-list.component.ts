import { Component, Input } from '@angular/core';
import { getSamePlatformAndVersion } from '../../../utils';
import { ClassMeta, DEFAULT_EXTENSION, Game } from '../../../models';

@Component({
  selector: 'scl-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent {
  DEFAULT_EXTENSION = DEFAULT_EXTENSION;
  private _game: Game;
  games: Game[];

  @Input() entities: Array<{ origin: string; name: string }>;
  @Input() classesMeta: ClassMeta[];

  @Input() set game(val: Game) {
    this.games = getSamePlatformAndVersion(val);
    this._game = val;
  }

  get game() {
    return this._game;
  }

  getClassDesc(className: string) {
    return this.classesMeta?.find((m) => m.name === className)?.desc;
  }
}

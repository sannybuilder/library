import { Component, Input } from '@angular/core';
import {
  ClassMeta,
  Game,
  ViewContext,
} from '../../../models';
import { getDefaultExtension } from '../../../utils';

@Component({
  selector: 'scl-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent {
  ViewContext = ViewContext;
  private _game: Game;
  games: Game[];

  @Input() entities: Array<{ origin: string; name: string }>;
  @Input() classesMeta: ClassMeta[];
  @Input() viewContext: ViewContext;

  @Input() set game(val: Game) {
    this.games = Object.values(Game);
    this._game = val;
  }

  get game() {
    return this._game;
  }

  getClassDesc(className: string) {
    return this.classesMeta?.find((m) => m.name === className)?.desc;
  }

  getBaseHref(game: Game) {
    if (this.viewContext === ViewContext.Code) {
      return `/${game}/native`;
    }
    return `/${game}/script`;
  }

  getDefaultExtension() {
    return getDefaultExtension(this.viewContext);
  }
}

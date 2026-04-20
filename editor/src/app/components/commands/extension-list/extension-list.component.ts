import { Component, Input } from '@angular/core';
import { Extension, Game, ViewContext } from '../../../models';
import {
  getContextRouteSegment,
  getExtensionScopeSegment,
  isCodeViewContext,
  isScriptViewContext,
} from '../../../utils';

@Component({
    selector: 'scl-extension-list',
    templateUrl: './extension-list.component.html',
    styleUrls: ['./extension-list.component.scss'],
    standalone: false
})
export class ExtensionListComponent {
  ViewContext = ViewContext;
  readonly isCodeViewContext = isCodeViewContext;
  readonly isScriptViewContext = isScriptViewContext;

  private _game: Game;
  games: Game[];

  @Input() extensions: Extension[];
  @Input() viewContext: ViewContext;

  @Input() set game(val: Game) {
    this.games = Object.values(Game);
    this._game = val;
  }

  get game() {
    return this._game;
  }

  get baseHref() {
    return `/${this.game}/${getContextRouteSegment(this.viewContext)}/${getExtensionScopeSegment(this.viewContext)}`;
  }

  getGameLinks() {
    return this.games.map((game) => ({
      game,
      route: ['/', game, 'extensions'],
    }));
  }
}

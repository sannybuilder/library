import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getSameEdition, isStringEnum } from '../../../utils';
import { EnumRaw, Game } from '../../../models';

@Component({
  selector: 'scl-enum-overview',
  templateUrl: './enum-overview.component.html',
  styleUrls: ['./enum-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnumOverviewComponent {
  private _enumToView: EnumRaw;
  isStringEnum = false;

  @Input() game: Game;
  @Input() enumGames: Game[];

  games: Game[] = [];

  @Input() set enumToView(val: EnumRaw) {
    this._enumToView = val;
    this.isStringEnum = isStringEnum(val.fields);
  }
  get enumToView() {
    return this._enumToView;
  }

  ngOnChanges() {
    if (this.game && this.enumGames) {
      const sameGames = getSameEdition(this.game);

      this.games = this.enumGames.filter((game) => sameGames.includes(game));
    }
  }
}

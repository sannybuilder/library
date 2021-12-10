import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { isStringEnum } from '../../../utils';
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

  @Input() set enumToView(val: EnumRaw) {
    this._enumToView = val;
    this.isStringEnum = isStringEnum(val.fields);
  }
  get enumToView() {
    return this._enumToView;
  }
}

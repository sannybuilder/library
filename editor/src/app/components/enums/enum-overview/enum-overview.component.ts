import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fillEnumValues, isStringEnum } from '../../../utils';
import { EnumRaw, Game } from '../../../models';

@Component({
  selector: 'scl-enum-overview',
  templateUrl: './enum-overview.component.html',
  styleUrls: ['./enum-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EnumOverviewComponent {
  private _enumToView: EnumRaw;
  private _values: EnumRaw['fields'] = [];
  isStringEnum = false;

  @Input() game: Game;
  @Input() enumGames: Game[];

  @Input() set enumToView(val: EnumRaw) {
    this._enumToView = val;
    this.isStringEnum = isStringEnum(val.fields);
    this._values = fillEnumValues(this._enumToView.fields);
  }
  get enumToView() {
    return this._enumToView;
  }

  autoValue(index: number) {
    return this._values[index]?.[1] ?? "";
  }
}

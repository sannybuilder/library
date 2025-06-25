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
  filterQuery = '';

  enumFields: Array<
    [/*name*/ string, /*value*/ string, /*is auto value*/ boolean]
  > = [];

  @Input() game: Game;
  @Input() enumGames: Game[];

  @Input() set enumToView(val: EnumRaw) {
    this._enumToView = val;
    const _isStringEnum = isStringEnum(val.fields);
    const autoValues = fillEnumValues(val.fields);
    this.enumFields = val.fields.map(([name, value], i) => {
      return [
        name,
        value !== null
          ? _isStringEnum
            ? `"${value}"`
            : value.toString()
          : autoValues[i][1]?.toString() ?? '',
        value === null,
      ];
    });
  }
  get enumToView() {
    return this._enumToView;
  }

  autoValue(index: number) {
    return this._values[index]?.[1] ?? '';
  }
}

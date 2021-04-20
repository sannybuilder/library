import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'scl-enum-overview',
  templateUrl: './enum-overview.component.html',
  styleUrls: ['./enum-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnumOverviewComponent {
  private _fields: Array<[string, string | number]>;

  @Input() enumName: string;
  @Input() set enumData(val: Record<string, string | number> | undefined) {
    this._fields = val ? Object.entries(val) : [];
  }

  get fields() {
    return this._fields;
  }
}

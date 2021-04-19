import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'scl-enum-overview',
  templateUrl: './enum-overview.component.html',
  styleUrls: ['./enum-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnumOverviewComponent {
  @Input() enumName: string;
}

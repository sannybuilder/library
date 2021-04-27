import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EnumRaw, Game } from '../../models';

@Component({
  selector: 'scl-enum-overview',
  templateUrl: './enum-overview.component.html',
  styleUrls: ['./enum-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnumOverviewComponent {
  @Input() enumToView: EnumRaw;
  @Input() enumGames: Game[];
}

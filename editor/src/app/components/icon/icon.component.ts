import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game, GameIcon } from '../../models';

@Component({
  selector: 'scl-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  GameIcon = GameIcon;

  @Input() game: Game;
  @Input() size = 24;
  @Input() opacity = 1.0;
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameIcon } from '../../../models/game-icon';
import { Game } from '../../../models';

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

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game, GameClasses } from '../../models';

@Component({
  selector: 'scl-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadPanelComponent {
  @Input() game: Game;

  getClasses(game: Game) {
    return GameClasses[game];
  }
}

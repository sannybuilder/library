import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Game, GameClassesAssets, GameEnumsAssets } from '../../../models';

@Component({
  selector: 'scl-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadPanelComponent {
  @Input() game: Game;

  getClasses(game: Game) {
    return GameClassesAssets[game];
  }

  getEnums(game: Game) {
    return GameEnumsAssets[game];
  }
}

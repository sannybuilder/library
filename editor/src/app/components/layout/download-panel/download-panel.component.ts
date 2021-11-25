import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  GameClassesAssets,
  GameEnumsAssets,
  GameKeywordsAssets,
  GameName,
} from '../../../models';

@Component({
  selector: 'scl-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadPanelComponent {
  @Input() gameName: GameName;

  getClasses(gameName: GameName) {
    return GameClassesAssets[gameName];
  }

  getEnums(gameName: GameName) {
    return GameEnumsAssets[gameName];
  }

  getKeywords(gameName: GameName) {
    return GameKeywordsAssets[gameName];
  }
}

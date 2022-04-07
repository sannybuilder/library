import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  GameClassesAssets,
  GameEnumsAssets,
  GameKeywordsAssets,
  Game,
  GameEnumsJsAssets,
  GameLibrary,
} from '../../../models';

@Component({
  selector: 'scl-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadPanelComponent {
  @Input() game: Game;
  @Output() generate = new EventEmitter()

  getClasses(game: Game) {
    return GameClassesAssets[game];
  }

  getEnums(game: Game) {
    return GameEnumsAssets[game];
  }

  getKeywords(game: Game) {
    return GameKeywordsAssets[game];
  }

  getEnumsJs(game: Game) {
    return GameEnumsJsAssets[game];
  }

  getExtensions(game: Game) {
    return GameLibrary[game];
  }

  customize() {
    this.generate.emit(); 
    return false;
  }
}

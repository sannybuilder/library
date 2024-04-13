import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  GameClassesAssets,
  GameEnumsAssets,
  Game,
  GameEnumsJsAssets,
  GameLibrary,
  GameOpcodesTxtAssets,
} from '../../../models';

@Component({
  selector: 'scl-download-panel',
  templateUrl: './download-panel.component.html',
  styleUrls: ['./download-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadPanelComponent {
  private _game: Game;

  sbFiles: Array<{ name: string; path: string | undefined }> = [];

  @Input() set game(game: Game) {
    this._game = game;
    this.sbFiles = [
      { name: 'classes.db', path: GameClassesAssets[game] },
      { name: 'enums.txt', path: GameEnumsAssets[game] },
      { name: 'opcodes.txt', path: GameOpcodesTxtAssets[game] },
    ].filter(({ path }) => path);
  }

  get game() {
    return this._game;
  }

  getEnumsJs(game: Game) {
    return GameEnumsJsAssets[game];
  }

  getExtensions(game: Game) {
    return GameLibrary[game];
  }
}

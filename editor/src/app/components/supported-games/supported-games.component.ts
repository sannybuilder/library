import { Component, Input } from '@angular/core';
import { Game, GameTitle, SupportInfo } from '../../models';

@Component({
  selector: 'scl-supported-games',
  templateUrl: './supported-games.component.html',
  styleUrls: ['./supported-games.component.scss'],
})
export class SupportedGamesComponent {
  @Input() supportInfo: SupportInfo;

  stringifyLevel(level: number, game: Game) {
    if (level === 1) {
      return `Supported in ${GameTitle[game]}`;
    }
    if (level === 2) {
      return `Supported in ${GameTitle[game]} but has different number of parameters`;
    }
    if (level === -1) {
      return `Not supported in ${GameTitle[game]}`;
    }
    if (level === 0) {
      return `No operation (NOP) in ${GameTitle[game]}`;
    }
  }
}

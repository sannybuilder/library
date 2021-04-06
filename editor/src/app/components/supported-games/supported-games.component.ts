import { Component, Input } from '@angular/core';
import { Game, GameSupportInfo, GameTitle, SupportLevel } from '../../models';

@Component({
  selector: 'scl-supported-games',
  templateUrl: './supported-games.component.html',
  styleUrls: ['./supported-games.component.scss'],
})
export class SupportedGamesComponent {
  SupportLevel = SupportLevel;
  @Input() supportInfo: GameSupportInfo[];

  stringifyLevel(level: number, game: Game) {
    if (level === SupportLevel.Supported) {
      return `Supported in ${GameTitle[game]}`;
    }
    if (level === SupportLevel.SupportedDiffParams) {
      return `Supported in ${GameTitle[game]} but has different number of parameters`;
    }
    if (level === SupportLevel.Unsupported) {
      return `Not supported in ${GameTitle[game]}`;
    }
    if (level === SupportLevel.Nop) {
      return `No operation (NOP) in ${GameTitle[game]}`;
    }
  }
}

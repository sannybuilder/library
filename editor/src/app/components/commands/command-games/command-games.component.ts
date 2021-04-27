import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Command,
  Game,
  GameSupportInfo,
  GameTitle,
  SupportLevel,
} from '../../../models';

@Component({
  selector: 'scl-command-games',
  templateUrl: './command-games.component.html',
  styleUrls: ['./command-games.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommandGamesComponent {
  SupportLevel = SupportLevel;
  @Input() supportInfo: GameSupportInfo[];
  @Input() extension: string;
  @Input() command: Command;

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

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
  GameTitle = GameTitle;
  SupportLevel = SupportLevel;
  @Input() supportInfo: GameSupportInfo[];
  @Input() extension: string;
  @Input() command: Command;

  stringifyLevel(level: number, game: Game) {
    if (level === SupportLevel.Supported) {
      return 'ui.commandGames.same';
    }
    if (level === SupportLevel.SupportedDiffParams) {
      return 'ui.commandGames.changed';
    }
    if (level === SupportLevel.Unsupported) {
      return 'ui.commandGames.unsupported';
    }
    if (level === SupportLevel.Nop) {
      return 'ui.commandGames.nop';
    }
  }
}

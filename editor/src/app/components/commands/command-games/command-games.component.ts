import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getQueryParamsForCommand, getMatchingKey } from '../../../utils';
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
  @Input() command: Command;
  @Input() game: Game;

  readonly TEXT_KEYS: Record<SupportLevel, string> = {
    [SupportLevel.Supported]: 'ui.commandGames.same',
    [SupportLevel.SupportedDiffParams]: 'ui.commandGames.changed',
    [SupportLevel.Unsupported]: 'ui.commandGames.unsupported',
    [SupportLevel.Nop]: 'ui.commandGames.nop',
    [SupportLevel.DoesNotExist]: 'ui.commandGames.doesNotExist',
  };

  getQueryParamsForCommand(command: Command, game: Game) {
    return getQueryParamsForCommand(command, game);
  }

  getKey(command: Command, game: Game) {
    const key = getMatchingKey(game, this.game);
    return command[key];
  }
}

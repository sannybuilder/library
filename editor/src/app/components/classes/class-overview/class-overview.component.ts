import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Command, Game } from '../../../models';

@Component({
  selector: 'scl-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassOverviewComponent {
  @Input() game: Game;
  @Input() className: string;
  @Input() classCommands: Array<{ command: Command; extension: string }>;

  @Output() view: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();

  onView(command: Command, extension: string) {
    this.view.emit({ command, extension });
    return false;
  }
}

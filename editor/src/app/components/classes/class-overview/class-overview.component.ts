import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ClassMeta, Command, DEFAULT_EXTENSION, Game } from '../../../models';

type ClassCommand = { command: Command; extension: string };

@Component({
  selector: 'scl-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassOverviewComponent {
  private _classCommands: ClassCommand[];
  DEFAULT_EXTENSION = DEFAULT_EXTENSION;
  filterQuery = '';
  commandsHaveSameOrigin = true;

  @Input() displayInlineDescription: boolean;
  @Input() game: Game;
  @Input() className: string;
  @Input() classOrigin: string;
  @Input() meta?: ClassMeta;
  @Input() set classCommands(val: ClassCommand[]) {
    this._classCommands = val;

    const origins = new Set();
    val.forEach(({ extension }) => {
      origins.add(extension);
    });
    this.commandsHaveSameOrigin = origins.size === 1;
  }
  get classCommands() {
    return this._classCommands;
  }

  @Output() view: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();
  @Output() descriptionClick = new EventEmitter();

  onView(command: Command, extension: string) {
    this.view.emit({ command, extension });
    return false;
  }

  interceptDescriptionClick(event: MouseEvent) {
    this.descriptionClick.next(event);
    return false;
  }
}

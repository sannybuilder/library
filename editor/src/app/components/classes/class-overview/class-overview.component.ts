import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UiFacade } from '../../../state';
import { Command, Game } from '../../../models';

@Component({
  selector: 'scl-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassOverviewComponent {
  private _classCommands: Array<{ command: Command; extension: string }>;
  isThisClassFromOtherExtension: boolean;
  displayInlineDescription$ = this._ui.displayInlineMethodDescription$;

  @Input() game: Game;
  @Input() className: string;
  @Input() set classCommands(
    val: Array<{ command: Command; extension: string }>
  ) {
    this._classCommands = val;
    this.isThisClassFromOtherExtension = val.every(
      (c) => c.extension !== 'default'
    );
  }
  get classCommands() {
    return this._classCommands;
  }

  @Output() view: EventEmitter<{
    command: Command;
    extension: string;
  }> = new EventEmitter();
  @Output() descriptionClick = new EventEmitter();

  constructor(private _ui: UiFacade) {}

  onView(command: Command, extension: string) {
    this.view.emit({ command, extension });
    return false;
  }

  toggleInlineDesc() {
    this._ui.toggleInlineMethodDescription();
    return false;
  }

  interceptDescriptionClick(event: MouseEvent) {
    this.descriptionClick.next(event);
    return false;
  }
}

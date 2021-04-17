import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Command } from '../../models';

@Component({
  selector: 'scl-class-overview',
  templateUrl: './class-overview.component.html',
  styleUrls: ['./class-overview.component.scss'],
})
export class ClassOverviewComponent {
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

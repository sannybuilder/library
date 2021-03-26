import { Component, Input } from '@angular/core';
import { Command, SupportInfo } from '../../models';

@Component({
  selector: 'scl-command-info',
  templateUrl: './command-info.component.html',
  styleUrls: ['./command-info.component.scss'],
})
export class CommandInfoComponent {
  @Input() command: Command;
  @Input() supportInfo: SupportInfo;
  @Input() snippet?: string;
}

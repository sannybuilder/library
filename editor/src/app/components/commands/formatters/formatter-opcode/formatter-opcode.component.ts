import { Component, Input } from '@angular/core';
import { Command } from 'src/app/models';

@Component({
  selector: 'scl-formatter-opcode',
  templateUrl: './formatter-opcode.component.html',
  styleUrls: ['./formatter-opcode.component.scss'],
})
export class FormatterOpcodeComponent {
  @Input() command: Command;
}

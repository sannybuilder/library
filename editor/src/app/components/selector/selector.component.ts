import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'scl-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent {
  @Input() choices: string[];
  @Input() model: string;
  @Input() label: string;

  freeInput: string;

  @Output() modelChange: EventEmitter<string> = new EventEmitter();
  @Output() keydown: EventEmitter<string> = new EventEmitter();

  update(value: string) {
    this.modelChange.emit(value);
  }

  onkeydown(event: KeyboardEvent) {
    const { key } = event;
    if (key) {
      this.keydown.emit(key.toLowerCase());
    }
  }
}

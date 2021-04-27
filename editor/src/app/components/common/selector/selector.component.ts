import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

interface Choice {
  prefix?: string;
  value: string;
}
@Component({
  selector: 'scl-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorComponent {
  private _choicesUi: Choice[];

  @Input() set choices(values: string[]) {
    this._choicesUi = values.map((value) => {
      const words = value.split(' ');
      return words.length > 1
        ? { prefix: words[0], value: words.slice(1).join(' ') }
        : { value };
    });
  }

  get choicesUi() {
    return this._choicesUi;
  }
  @Input() model: string;
  @Input() label: string;
  @Input() canInput = true;
  @Input() disabled = false;
  @Input() narrowDropdown = false;

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

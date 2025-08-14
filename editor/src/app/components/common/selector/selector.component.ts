import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostListener,
} from '@angular/core';

interface Choice {
  prefix?: string;
  value: string;
  hotkey?: string;
}
@Component({
  selector: 'scl-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SelectorComponent {
  private _choicesUi: Choice[];

  @Input() set choices(values: string[]) {
    this._choicesUi = values.map((value) => {
      const words = value.split(' ');
      if (words.length <= 1) {
        return { value };
      }
      const prefix = words[0];

      const hotkey = words[words.length - 1].startsWith('hotkey:')
        ? words[words.length - 1].split(':')[1].toLowerCase()
        : undefined;

      const text = hotkey
        ? words.slice(1, -1).join(' ')
        : words.slice(1).join(' ');

      return { prefix, value: text, hotkey };
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
  @Input() invalid = false;

  freeInput = '';

  @Output() modelChange: EventEmitter<string> = new EventEmitter();

  update(value: string) {
    this.modelChange.emit(value);
  }

  @HostListener('keydown', ['$event.key'])
  onkeydown(key: string) {
    if (!key) return;
    this.choicesUi.forEach((c) => {
      if (c.hotkey === key.toLowerCase()) {
        this.update(c.value);
        return;
      }
    });
  }
}

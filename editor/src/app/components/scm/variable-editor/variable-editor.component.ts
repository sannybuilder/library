import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { KeyValueEntry } from '../key-value-editor/key-value-editor.component';

@Component({
  selector: 'scl-variable-editor',
  templateUrl: './variable-editor.component.html',
  styleUrls: ['./variable-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VariableEditorComponent {
  private _variables: Record<string, string> = {};

  @Input() set variables(value: Record<string, string>) {
    this._variables = value ?? {};
    this.entries = Object.entries(this._variables)
      .map(([key, val]) => ({
        key: this.toRawVariableKey(key),
        value: val,
      }));
  }

  get variables() {
    return this._variables;
  }

  @Output() variablesChange = new EventEmitter<Record<string, string>>();

  entries: KeyValueEntry[] = [];

  onEntriesChange(entries: KeyValueEntry[]) {
    this.entries = entries;
    this.variablesChange.emit(this.toRecord(this.entries));
  }

  toRawVariableKey(key: string): string {
    return key.startsWith('g.') ? key.slice('g.'.length) : key;
  }

  private toRecord(entries: KeyValueEntry[]): Record<string, string> {
    const variables: Record<string, string> = {};
    for (const entry of entries) {
      variables[`g.${entry.key}`] = entry.value ?? '';
    }
    return variables;
  }
}

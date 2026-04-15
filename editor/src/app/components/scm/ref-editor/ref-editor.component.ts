import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { KeyValueEntry } from '../key-value-editor/key-value-editor.component';
import { extractRefOffset } from '../../../utils';

@Component({
  selector: 'scl-ref-editor',
  templateUrl: './ref-editor.component.html',
  styleUrls: ['./ref-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RefEditorComponent {
  private _refs: Record<string, string> = {};

  @Input() set refs(value: Record<string, string>) {
    this._refs = value ?? {};
    this.entries = Object.entries(this._refs).map(([key, val]) => ({
      key: extractRefOffset(key),
      value: val,
    }));
  }

  get refs() {
    return this._refs;
  }

  @Output() refsChange = new EventEmitter<Record<string, string>>();

  entries: KeyValueEntry[] = [];

  onEntriesChange(entries: KeyValueEntry[]) {
    this.entries = entries;
    this.refsChange.emit(this.toRecord(this.entries));
  }

  private toRecord(entries: KeyValueEntry[]): Record<string, string> {
    const refs: Record<string, string> = {};
    for (const entry of entries) {
      refs[`ref.${entry.key}`] = entry.value ?? '';
    }
    return refs;
  }
}

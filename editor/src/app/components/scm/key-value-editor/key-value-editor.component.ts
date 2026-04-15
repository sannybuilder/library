import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

export interface KeyValueEntry {
  key: string;
  value: string;
}

@Component({
  selector: 'scl-key-value-editor',
  templateUrl: './key-value-editor.component.html',
  styleUrls: ['./key-value-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class KeyValueEditorComponent {
  @Input() entries: KeyValueEntry[] = [];
  @Input() emptyText = 'No entries found';
  @Input() addButtonText = 'Add row';
  @Input() filterPlaceholder = 'Filter key or value';

  @Output() entriesChange = new EventEmitter<KeyValueEntry[]>();

  @ViewChildren('keyInput') keyInputs!: QueryList<ElementRef<HTMLInputElement>>;

  filterQuery = '';

  get filteredEntries() {
    const query = this.filterQuery.trim().toLowerCase();
    if (!query) {
      return this.entries;
    }

    return this.entries.filter((entry) => {
      return (
        entry.key.toLowerCase().includes(query) ||
        (entry.value ?? '').toLowerCase().includes(query)
      );
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  addRow() {
    this.filterQuery = '';
    this.entries = [...this.entries, { key: '', value: '' }];
    this.entriesChange.emit(this.entries);

    setTimeout(() => {
      const lastKeyInput = this.keyInputs?.last?.nativeElement;
      if (lastKeyInput) {
        lastKeyInput.focus();
      }
    });
  }

  updateKey(target: KeyValueEntry, key: string) {
    target.key = key;
    this.entriesChange.emit(this.entries);
  }

  updateValue(target: KeyValueEntry, value: string) {
    target.value = value;
    this.entriesChange.emit(this.entries);
  }

  deleteRow(target: KeyValueEntry) {
    this.entries = this.entries.filter((entry) => entry !== target);
    this.entriesChange.emit(this.entries);
  }
}

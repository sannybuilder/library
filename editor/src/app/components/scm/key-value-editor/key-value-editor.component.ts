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
import { isValidIdentifier } from '../../../utils';

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
  private _entries: KeyValueEntry[] = [];

  @Input() set entries(value: KeyValueEntry[]) {
    this._entries = value ?? [];
    this.updateErrors();
  }

  get entries() {
    return this._entries;
  }

  @Input() emptyText = 'No entries found';
  @Input() addButtonText = 'Add row';
  @Input() filterPlaceholder = 'Filter key or value';

  @Output() entriesChange = new EventEmitter<KeyValueEntry[]>();
  @Output() hasError = new EventEmitter<boolean>();

  @ViewChildren('keyInput') keyInputs!: QueryList<ElementRef<HTMLInputElement>>;

  filterQuery = '';
  isInvalid = false;
  errors: Record<'emptyKey' | 'emptyValue' | 'invalidIdentifier', boolean> = {
    emptyKey: false,
    emptyValue: false,
    invalidIdentifier: false,
  };
  errorMessages: string[] = [];

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
    this.updateErrors();

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
    this.updateErrors();
  }

  updateValue(target: KeyValueEntry, value: string) {
    target.value = value;
    this.entriesChange.emit(this.entries);
    this.updateErrors();
  }

  deleteRow(target: KeyValueEntry) {
    this.entries = this.entries.filter((entry) => entry !== target);
    this.entriesChange.emit(this.entries);
    this.updateErrors();
  }

  private updateErrors() {
    this.errors.emptyKey = this.entries.some((entry) => !entry.key?.trim());
    this.errors.emptyValue = this.entries.some((entry) => !entry.value?.trim());
    this.errors.invalidIdentifier = this.entries.some(
      ({ value }) => !isValidIdentifier(value),
    );
    this.errorMessages = Object.entries(this.errors)
      .filter(([_, hasError]) => hasError)
      .map(([errorType]) => `ui.errors.scm.${errorType}`);

    this.isInvalid = this.errorMessages.length > 0;
    this.hasError.emit(this.isInvalid);
  }
}

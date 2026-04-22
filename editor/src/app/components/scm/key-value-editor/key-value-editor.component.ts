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
import { KeyValueEntry } from '../model';

@Component({
  selector: 'scl-key-value-editor',
  templateUrl: './key-value-editor.component.html',
  styleUrls: ['./key-value-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class KeyValueEditorComponent {
  private _entries: KeyValueEntry[] = [];
  private _requiredPrefix: string[] = [];
  private _inEditMode = false;
  filterQuery = '';
  filteredEntries: KeyValueEntry[] = [];

  @Input() set entries(value: KeyValueEntry[]) {
    this._entries = value ?? [];
    this.updateFilterQuery(this.filterQuery);
    this.updateErrors();
  }

  get entries() {
    return this._entries;
  }

  @Input() set requiredPrefix(value: string[]) {
    this._requiredPrefix = value ?? [];
    this.updateErrors();
  }
  get requiredPrefix() {
    return this._requiredPrefix;
  }

  @Input() emptyText = 'No entries found';
  @Input() addButtonText = 'Add row';
  @Input() filterPlaceholder = 'Filter key or value';

  @Output() entriesChange = new EventEmitter<KeyValueEntry[]>();
  @Output() hasError = new EventEmitter<boolean>();

  @ViewChildren('keyInput') keyInputs!: QueryList<ElementRef<HTMLInputElement>>;

  isInvalid = false;
  errors: Record<
    | 'emptyKey'
    | 'emptyValue'
    | 'invalidIdentifier'
    | 'duplicateKey'
    | 'invalidKeyPrefix',
    boolean
  > = {
    emptyKey: false,
    emptyValue: false,
    invalidIdentifier: false,
    duplicateKey: false,
    invalidKeyPrefix: false,
  };
  errorMessages: Array<{ args?: Record<string, unknown>; text: string }> = [];

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
    this.errors.emptyKey = false;
    this.errors.emptyValue = false;
    this.errors.invalidIdentifier = false;
    this.errors.duplicateKey = false;
    this.errors.invalidKeyPrefix = false;
    this.errorMessages = [];
    for (const entry of this.entries) {
      if (!entry.key?.trim()) {
        this.errors.emptyKey = true;
        this.errorMessages.push({ text: 'ui.errors.scm.emptyKey' });
      } else if (
        this.requiredPrefix.length > 0 &&
        !this.requiredPrefix.some((prefix) => entry.key.startsWith(prefix))
      ) {
        this.errors.invalidKeyPrefix = true;
        this.errorMessages.push({
          args: {
            key: entry.key,
            requiredPrefix: this.requiredPrefix.join(', '),
          },
          text: 'ui.errors.scm.invalidKeyPrefix',
        });
      } else if (this.entries.filter((e) => e.key === entry.key).length > 1) {
        this.errors.duplicateKey = true;
        this.errorMessages.push({
          args: { key: entry.key },
          text: 'ui.errors.scm.duplicateKey',
        });
      }

      if (!entry.value?.trim()) {
        this.errors.emptyValue = true;
        this.errorMessages.push({ text: 'ui.errors.scm.emptyValue' });
      } else if (!isValidIdentifier(entry.value!)) {
        this.errors.invalidIdentifier = true;
        this.errorMessages.push({
          args: { value: entry.value },
          text: 'ui.errors.scm.invalidIdentifier',
        });
      }
    }
    this.isInvalid = this.errorMessages.length > 0;
    this.hasError.emit(this.isInvalid);
  }

  updateFilterQuery(newQuery: string) {
    this.filterQuery = newQuery;

    if (this._inEditMode) {
      return;
    }

    const query = this.filterQuery.trim().toLowerCase();
    if (!query) {
      this.filteredEntries = this.entries;
    }

    this.filteredEntries = this.entries.filter((entry) => {
      return (
        entry.key.toLowerCase().includes(query) ||
        (entry.value ?? '').toLowerCase().includes(query)
      );
    });
  }
}

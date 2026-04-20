import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { KeyValueEntry } from '../model';

@Component({
  selector: 'scl-ref-editor',
  templateUrl: './ref-editor.component.html',
  styleUrls: ['./ref-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RefEditorComponent {
  @Input() refs: KeyValueEntry[] = [];
  @Output() refsChange = new EventEmitter<KeyValueEntry[]>();
  @Output() hasError = new EventEmitter<boolean>();

  onEntriesChange(entries: KeyValueEntry[]) {
    this.refsChange.emit(entries);
  }

  onHasError(hasError: boolean) {
    this.hasError.emit(hasError);
  }
}

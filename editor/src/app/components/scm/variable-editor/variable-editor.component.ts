import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { KeyValueEntry } from '../model';

@Component({
  selector: 'scl-variable-editor',
  templateUrl: './variable-editor.component.html',
  styleUrls: ['./variable-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class VariableEditorComponent {
  @Input() variables: KeyValueEntry[] = [];
  @Output() variablesChange = new EventEmitter<KeyValueEntry[]>();
  @Output() hasError = new EventEmitter<boolean>();

  onEntriesChange(entries: KeyValueEntry[]) {
    this.variablesChange.emit(entries);
  }

  onHasError(hasError: boolean) {
    this.hasError.emit(hasError);
  }
}

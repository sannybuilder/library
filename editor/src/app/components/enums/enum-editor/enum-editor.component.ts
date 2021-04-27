import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { capitalizeFirst } from '../../../utils';
import { EnumRaw, Game } from '../../../models';

type ErrorType =
  | 'emptyEnumName'
  | 'emptyFieldName'
  | 'duplicateFieldName'
  | 'emptyEnum';

@Component({
  selector: 'scl-enum-editor',
  templateUrl: './enum-editor.component.html',
  styleUrls: ['./enum-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnumEditorComponent {
  private _enumToEdit: EnumRaw;
  private _enumGames: Game[];
  cloneTargets: Array<{ name: string; value: Game }>;

  @Input() set enumToEdit(val: EnumRaw) {
    this._enumToEdit = val;
    this.isDirty = false;
    this.updateErrors();
  }

  get enumToEdit(): EnumRaw {
    return this._enumToEdit;
  }

  @Input() set enumGames(val: Game[]) {
    this._enumGames = val;

    const games = Object.entries(Game);
    this.cloneTargets = games
      .filter(([_, game]) => !this.enumGames?.includes(game))
      .map(([name, value]) => ({ name, value }));
  }

  get enumGames() {
    return this._enumGames;
  }

  @Input() game: Game;
  @Output() hasError: EventEmitter<boolean> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() clone: EventEmitter<Game> = new EventEmitter();

  errors: Record<ErrorType, boolean> = {
    emptyEnumName: false,
    emptyFieldName: false,
    emptyEnum: false,
    duplicateFieldName: false,
  };
  errorMessages: string[] = [];
  isDirty: boolean;

  readonly errorHandlers: Record<ErrorType, () => void> = {
    emptyEnumName: this.updateEmptyEnumNameError,
    emptyFieldName: this.updateEmptyFieldNameError,
    duplicateFieldName: this.updateDuplicateFieldNameError,
    emptyEnum: this.updateEmptyEnum,
  };

  readonly messages: Record<ErrorType, string> = {
    emptyEnumName: 'Enum name can not be empty',
    emptyFieldName: 'Field name can not be empty',
    duplicateFieldName: 'Duplicate field name',
    emptyEnum: 'Enum must contain at least one field',
  };

  deleteEnum() {
    this.delete.emit();
  }

  canClone() {
    return !this.enumToEdit?.isNew && this.cloneTargets.length > 0;
  }

  cloneEnum(game: Game) {
    this.clone.emit(game);
  }

  updateErrors() {
    this.updateError(...(Object.keys(this.errors) as ErrorType[]));
  }

  updateError(...errors: ErrorType[]) {
    errors.forEach((error) => this.errorHandlers[error].call(this));
    this.errorMessages = Object.entries(this.errors)
      .filter(([_, v]) => v)
      .map(([k, _]) => this.messages[k as ErrorType]);
    this.hasError.emit(this.errorMessages.length > 0);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  addNewField() {
    this.enumToEdit.fields.push(['', '']);
    this.updateErrors();
  }

  deleteField(index: number) {
    this.enumToEdit.fields.splice(index, 1);
    this.updateErrors();
  }

  onEnumNameChange(val: string) {
    this.enumToEdit.name = capitalizeFirst(val);
    this.isDirty = true;
    this.updateErrors();
  }

  onFieldNameChange(val: string, field: [string, string | number | null]) {
    field[0] = val;
    this.isDirty = true;
    this.updateErrors();
  }

  onFieldValueChange(val: string, field: [string, string | number | null]) {
    field[1] = val;
    this.isDirty = true;
    this.updateErrors();
  }

  isStringEnum() {
    return this.enumToEdit.fields.some(([_, val]) => {
      return typeof val === 'string' && val.length > 0 && isNaN(+val);
    });
  }

  evaluateValue(index: number): string {
    const [name, val] = this.enumToEdit.fields[index];

    if (this.isStringEnum()) {
      return name || '';
    }

    if (index === 0 || val) {
      return parseInt(val.toString() || '0', 10).toString();
    }

    return (parseInt(this.evaluateValue(index - 1), 10) + 1).toString();
  }

  isFieldNameDuplicate(fieldName: string) {
    return (
      !!fieldName &&
      this.enumToEdit.fields.filter(([name]) => fieldName === name).length > 1
    );
  }

  private updateEmptyEnumNameError() {
    this.errors.emptyEnumName = !this.enumToEdit.name;
  }

  private updateEmptyFieldNameError() {
    this.errors.emptyFieldName = this.enumToEdit.fields.some(([name]) => !name);
  }

  private updateDuplicateFieldNameError() {
    this.errors.duplicateFieldName = this.enumToEdit.fields.some(([name]) =>
      this.isFieldNameDuplicate(name)
    );
  }

  private updateEmptyEnum() {
    this.errors.emptyEnum = this.enumToEdit.fields.length === 0;
  }
}

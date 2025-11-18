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
import { StructRaw, StructFieldType, Game } from '../../../models';
import { trim } from 'lodash';

type ErrorType =
  | 'emptyStructName'
  | 'emptyFieldName'
  | 'duplicateFieldName'
  | 'emptyStruct'
  | 'nameConflict'
  | 'invalidStructName'
  | 'invalidFieldType';

@Component({
  selector: 'scl-struct-editor',
  templateUrl: './struct-editor.component.html',
  styleUrls: ['./struct-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class StructEditorComponent {
  private _structToEdit: StructRaw;
  private _structGames: Game[];
  cloneTargets: Array<{ name: string; value: Game }>;

  StructFieldType = StructFieldType;
  fieldTypes: string[] = [
    ...Object.values(StructFieldType),
  ];

  @Input() set structToEdit(val: StructRaw) {
    this._structToEdit = val;
    this.updateErrors();
    this.isDirty = false;
  }

  get structToEdit(): StructRaw {
    return this._structToEdit;
  }

  @Input() set structGames(val: Game[]) {
    this._structGames = val;

    const games = Object.entries(Game);
    this.cloneTargets = games
      .filter(([_, game]) => !this.structGames?.includes(game))
      .map(([name, value]) => ({ name, value }));
  }

  get structGames() {
    return this._structGames;
  }

  @Input() game: Game;
  @Output() hasError: EventEmitter<boolean> = new EventEmitter();
  @Output() delete: EventEmitter<void> = new EventEmitter();
  @Output() clone: EventEmitter<Game> = new EventEmitter();
  @Input() structNames: string[];

  errors: Record<ErrorType, boolean> = {
    emptyStructName: false,
    emptyFieldName: false,
    emptyStruct: false,
    duplicateFieldName: false,
    invalidFieldType: false,
    invalidStructName: false,
    nameConflict: false,
  };
  errorMessages: string[] = [];
  isDirty: boolean;
  isInvalid: boolean;

  readonly errorHandlers: Record<ErrorType, () => void> = {
    emptyStructName: this.updateEmptyStructNameError,
    emptyFieldName: this.updateEmptyFieldNameError,
    duplicateFieldName: this.updateDuplicateFieldNameError,
    invalidFieldType: this.updateInvalidFieldTypeError,
    invalidStructName: this.updateInvalidStructNameError,
    emptyStruct: this.updateEmptyStruct,
    nameConflict: this.updateNameConflictError,
  };

  deleteStruct() {
    this.delete.emit();
  }

  canClone() {
    return !this.structToEdit?.isNew && this.cloneTargets.length > 0;
  }

  cloneStruct(game: Game) {
    if (!this.isInvalid) {
      this.clone.emit(game);
    }
  }

  updateErrors() {
    this.updateError(...(Object.keys(this.errors) as ErrorType[]));
    this.isDirty = true;
  }

  updateError(...errors: ErrorType[]) {
    errors.forEach((error) => this.errorHandlers[error].call(this));
    this.errorMessages = Object.entries(this.errors)
      .filter(([_, v]) => v)
      .map(([k, _]) => `ui.errors.struct.${k}`);
    this.isInvalid = this.errorMessages.length > 0;
    this.hasError.emit(this.isInvalid);
  }

  drop(event: CdkDragDrop<StructRaw['fields']>) {
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
    this.structToEdit.fields.push({
      name: '',
      type: StructFieldType.Int32,
      isArray: false,
      isPointer: false,
    });
    this.updateErrors();
  }

  deleteField(index: number) {
    this.structToEdit.fields.splice(index, 1);
    this.updateErrors();
  }

  onStructNameChange(val: string) {
    this.structToEdit.name = capitalizeFirst(trim(val));
    this.updateErrors();
  }

  onFieldNameChange(val: string, index: number) {
    this.structToEdit.fields[index].name = trim(val);
    this.updateErrors();
  }

  onFieldTypeChange(val: string, index: number) {
    this.structToEdit.fields[index].type = val;
    this.updateErrors();
  }

  onFieldPointerChange(checked: boolean, index: number) {
    this.structToEdit.fields[index].isPointer = checked;
    this.updateErrors();
  }

  onFieldArrayChange(checked: boolean, index: number) {
    this.structToEdit.fields[index].isArray = checked;
    if (!checked) {
      this.structToEdit.fields[index].arraySize = undefined;
    }
    this.updateErrors();
  }

  onArraySizeChange(val: string, index: number) {
    const size = parseInt(val, 10);
    this.structToEdit.fields[index].arraySize = isNaN(size) ? undefined : size;
    this.updateErrors();
  }

  onPaddingChange(val: string, index: number) {
    const padding = parseInt(val, 10);
    this.structToEdit.fields[index].padding = isNaN(padding) || padding === 0 ? undefined : padding;
    this.updateErrors();
  }

  updateEmptyStructNameError() {
    this.errors.emptyStructName = !this.structToEdit?.name?.trim();
  }

  updateEmptyFieldNameError() {
    this.errors.emptyFieldName = this.structToEdit.fields.some(
      (f) => !f.name?.trim()
    );
  }

  updateDuplicateFieldNameError() {
    const names = this.structToEdit.fields.map((f) => f.name.toLowerCase());
    this.errors.duplicateFieldName =
      names.length !== new Set(names).size && names.some((n) => n);
  }

  updateInvalidFieldTypeError() {
    this.errors.invalidFieldType = this.structToEdit.fields.some(
      (f) => !f.type?.trim()
    );
  }

  updateInvalidStructNameError() {
    this.errors.invalidStructName = !!/[^a-zA-Z0-9_]/.exec(
      this.structToEdit?.name ?? ''
    );
  }

  updateEmptyStruct() {
    this.errors.emptyStruct = this.structToEdit.fields.length === 0;
  }

  updateNameConflictError() {
    this.errors.nameConflict =
      !!this.structToEdit?.name &&
      this.structNames?.some(
        (name) =>
          name.toLowerCase() === this.structToEdit.name.toLowerCase() &&
          (!this._structToEdit.isNew || name !== this.structToEdit.name)
      );
  }
}

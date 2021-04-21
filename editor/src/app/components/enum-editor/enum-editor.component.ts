import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EnumRaw } from '../../models';

@Component({
  selector: 'scl-enum-editor',
  templateUrl: './enum-editor.component.html',
  styleUrls: ['./enum-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnumEditorComponent {
  @Input() enumToEdit: EnumRaw;

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
  }

  deleteField(index: number) {
    this.enumToEdit.fields.splice(index, 1);
  }
}

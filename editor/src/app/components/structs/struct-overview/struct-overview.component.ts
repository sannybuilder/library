import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StructRaw, Game } from '../../../models';

@Component({
  selector: 'scl-struct-overview',
  templateUrl: './struct-overview.component.html',
  styleUrls: ['./struct-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class StructOverviewComponent {
  filterQuery = '';

  @Input() game: Game;
  @Input() structGames: Game[];
  @Input() structToView: StructRaw;

  getFieldTypeDisplay(field: StructRaw['fields'][0]) {
    let typeDisplay = field.type;

    if (field.isPointer) {
      typeDisplay += '*';
    }

    if (field.isArray && field.arraySize) {
      typeDisplay += `[${field.arraySize}]`;
    }

    return typeDisplay;
  }
}

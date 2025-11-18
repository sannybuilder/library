import { Component, Input } from '@angular/core';
import { Game, ViewContext } from '../../../models';

@Component({
  selector: 'scl-struct-list',
  templateUrl: './struct-list.component.html',
  styleUrls: ['./struct-list.component.scss'],
  standalone: false,
})
export class StructListComponent {
  ViewContext = ViewContext;

  @Input() structNames: string[];
  @Input() viewContext: ViewContext;
  @Input() game: Game;

  filterQuery = '';
}

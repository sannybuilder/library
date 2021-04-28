import { Component, Input } from '@angular/core';
import { Entity, Game } from '../../../models';

@Component({
  selector: 'scl-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent {
  games: string[] = Object.values(Game);
  @Input() game: Game;
  @Input() entities: Entity[];
}

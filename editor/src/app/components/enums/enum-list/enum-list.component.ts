import { Component, Input } from '@angular/core';
import { Game } from '../../../models';

@Component({
  selector: 'scl-enum-list',
  templateUrl: './enum-list.component.html',
  styleUrls: ['./enum-list.component.scss'],
})
export class EnumListComponent {
  games: string[] = Object.values(Game);
  @Input() enumNames: string[];
  @Input() game: Game;
}

import { Component, Input } from '@angular/core';
import { Game } from '../../../../app/models';

@Component({
  selector: 'scl-game-links',
  templateUrl: './game-links.component.html',
  styleUrl: './game-links.component.scss',
  standalone: false,
})
export class GameLinksComponent {
  @Input() links: Array<{ game: Game; route: string[] }>;
}

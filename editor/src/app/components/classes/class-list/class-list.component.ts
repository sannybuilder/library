import { Component, Input } from '@angular/core';
import { ClassesMeta, DEFAULT_EXTENSION, Game } from '../../../models';

@Component({
  selector: 'scl-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent {
  DEFAULT_EXTENSION = DEFAULT_EXTENSION;
  games: string[] = Object.values(Game);

  @Input() game: Game;
  @Input() entities: Array<{ origin: string; name: string }>;
  @Input() meta: ClassesMeta;

  getClassDesc(className: string) {
    return this.meta?.find((m) => m.name === className)?.desc;
  }
}

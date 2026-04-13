import { Component, Input } from '@angular/core';
import { Game } from 'src/app/models';
import { ScmXrefItem } from '../model';
import { getRoutePath } from '../../../utils';

@Component({
  selector: 'scl-scm-xrefs',
  templateUrl: './scm-xrefs.component.html',
  styleUrls: ['./scm-xrefs.component.scss'],
  standalone: false,
})
export class ScmXrefsComponent {
  @Input() game!: Game;
  @Input() xrefs: ScmXrefItem[] = [];
  @Input() activeRef!: string;

  getRoutePath(path: string) {
    return getRoutePath(this.game, path);
  }
}

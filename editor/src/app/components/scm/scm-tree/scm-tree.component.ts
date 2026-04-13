import { Component, Input } from '@angular/core';
import { ScmTreeNode } from '../model';
import { Game } from '../../../models';
import { getRoutePath } from '../../../utils';

@Component({
  selector: 'scl-scm-tree',
  templateUrl: './scm-tree.component.html',
  styleUrls: ['./scm-tree.component.scss'],
  standalone: false,
})
export class ScmTreeComponent {
  @Input() activeFile?: string;
  @Input() game!: Game;
  @Input() tree: ScmTreeNode[] = [];

  isNodeOpen(node: ScmTreeNode): boolean {
    return !!node.children?.some((child) => child.path === this.activeFile);
  }

  getRoutePathForNode(path: string) {
    return getRoutePath(this.game, path);
  }
}

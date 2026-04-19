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

  filterQuery = '';

  isNodeOpen(node: ScmTreeNode): boolean {
    return !!node.children?.some((child) => child.path === this.activeFile);
  }

  getRoutePathForNode(path: string) {
    return getRoutePath(this.game, path);
  }

  shouldShowNode(node: ScmTreeNode): boolean {
    const query = this.filterQuery.trim().toLowerCase();
    return (
      !query ||
      node.label.toLowerCase().includes(query) ||
      node.path?.toLowerCase().includes(query) ||
      (node.children?.some((child) => this.shouldShowNode(child)) ?? false)
    );
  }
}

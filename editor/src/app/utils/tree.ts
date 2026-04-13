import { TreeNode } from '../models/tree';

export const isThisNodeTerminal = (node: TreeNode) =>
  node.next.every((n) => n.next.length === 0);

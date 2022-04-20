import { TreeNode } from '../models/tree';
import { isOpcode } from './command';

export const isThisNodeTerminal = (node: TreeNode) =>
  node.next.every((n) => n.next.length === 0);

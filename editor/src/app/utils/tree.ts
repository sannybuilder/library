import { TreeNode } from '../models/tree';
import { isOpcode } from './command';

export const isOpcodeRef = ({ id }: { id: string }) => isOpcode(id)

export const isThisNodeTerminal = (node: TreeNode) =>
  node.next.every(isOpcodeRef);

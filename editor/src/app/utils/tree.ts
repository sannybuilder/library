import { TreeNode } from '../models/tree';

export const isOpcodeRef = ({ id }: { id: string }) =>
  id.length === 4 && id[0] === '0';

export const isThisNodeTerminal = (node: TreeNode) =>
  node.next.every(isOpcodeRef);

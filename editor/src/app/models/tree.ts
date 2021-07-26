export interface TreeNode {
  next: TreeNode[];
  id: string;
}

export interface Tree {
  root: TreeNode;
}

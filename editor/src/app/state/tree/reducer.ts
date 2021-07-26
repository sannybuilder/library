import { createReducer, on } from '@ngrx/store';
import { fromPairs, partition, toPairs, uniq } from 'lodash';

import { Tree, TreeNode } from '../../models/tree';
import { back, loadStatements, next, restart } from './actions';
import statements from './statements';

export interface TreeState {
  dictionary: Record<string, string>;
  tree?: Tree;
  currentNode?: TreeNode;
  history: TreeNode[];
  historyLine: string[];
}

function getNext(lines: string[][], level: number): TreeNode[] {
  const [nodes, leaves] = partition(lines, (line) => line.length > level);
  const children = uniq(nodes.map((line) => line[level]));

  return [
    ...leaves.map((line) => ({ id: line[0], next: [] })),
    ...children.map((id) => {
      return {
        id,
        next: getNext(
          lines.filter((l) => l[level] === id),
          level + 1
        ),
      };
    }),
  ];
}

function buildTree(lines: string[][]) {
  return { root: { id: 'root', next: getNext(lines, 1) } };
}

export const initialState: TreeState = {
  dictionary: {},
  history: [],
  historyLine: [''],
};

export const treeReducer = createReducer(
  initialState,
  on(loadStatements, (state, { game, lang }) => {
    const { dictionary, lines } = parseStatements(
      statements[game][lang] || statements[game]['en'] || []
    );
    const tree = buildTree(lines);
    return {
      ...state,
      tree,
      currentNode: tree.root,
      dictionary,
    };
  }),
  on(next, (state, { node, lineChunk }) => ({
    ...state,
    currentNode: node,
    history: [...state.history, state.currentNode!],
    historyLine: [...state.historyLine, lineChunk],
  })),
  on(back, (state) => {
    const newHistory = [...state.history];
    const prev = newHistory.pop();
    if (!prev) {
      return state;
    }
    return {
      ...state,
      currentNode: prev,
      history: newHistory,
      historyLine: state.historyLine.slice(0, -1),
    };
  }),
  on(restart, (state) => ({
    ...state,
    currentNode: state.tree?.root,
    history: [],
    historyLine: [''],
  }))
);

function parseStatements(statements: Record<string, string>) {
  const entries = Object.entries(statements);

  const dict: string[] = [];

  const getOrInsert = (chunk: string) => {
    const i = dict.findIndex((c) => c === chunk);
    if (i === -1) {
      return (dict.push(chunk) - 1).toString();
    }
    return i.toString();
  };

  const lines = entries.map(([k, v]) => {
    const chunks = v.split('|').map((p) => p.trim());

    return [k, ...chunks.map(getOrInsert)];
  });

  return {
    lines,
    dictionary: fromPairs(toPairs(dict)),
  };
}

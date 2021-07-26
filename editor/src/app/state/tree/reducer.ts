import { createReducer, on } from '@ngrx/store';
import { fromPairs, toPairs, uniq } from 'lodash';
import { Tree, TreeNode } from '../../models/tree';
import { back, loadStatements, next, restart } from './actions';

export interface TreeState {
  dictionary: Record<string, string>;
  tree?: Tree;
  currentNode?: TreeNode;
  history: TreeNode[];
  historyLine: string[];
}

// prettier-ignore
const STATEMENTS: Record<string, Record<string, string>> = {
  en: {
    '0053': 'I want to create | a player',
    '00A5': 'I want to create | a vehicle',
    '009A': 'I want to create | a character | standing on foot',
    '0129': 'I want to create | a character | sitting in the car as   | a driver',
    '01C8': 'I want to create | a character | sitting in the car as   | a passenger',
    '0001': 'I have           | a script    | and I want to pause it',
    '004E': 'I have           | a script    | and I want to end it',
    '0050': 'I have           | a script    | and I want to call a subroutine',
    '0051': 'I have           | a script    | and I want to return from the current subroutine',
    '0118': 'I have           | a car         | and I want to check     | if it is still alive',
    '0119': 'I have           | a character   | and I want to check     | if they are still alive',
    '0256': 'I have           | a player      | and I want to check     | if they are still alive',
    '010A': 'I have           | a player      | and I want to check     | their money amount',
    '0226': 'I have           | a character   | and I want to get       | their health value'
  },
  ru: {
    '0053': 'Я хочу создать | игрока',
    '00A5': 'Я хочу создать | машину',
    '009A': 'Я хочу создать | персонажа  | , который стоит на ногах',
    '0129': 'Я хочу создать | персонажа  | , который сидит в машине    | , как водитель',
    '01C8': 'Я хочу создать | персонажа  | , который сидит в машине    | , как пассажир',
    '0001': 'У меня есть    | скрипт    | , и я хочу приостановить его',
    '004E': 'У меня есть    | скрипт    | , и я хочу завершить его',
    '0050': 'У меня есть    | скрипт    | , и я хочу вызвать подпрограмму',
    '0051': 'У меня есть    | скрипт    | , и я хочу выйти из текущей подпрограммы',
    '0118': 'У меня есть    | персонаж  | , и я хочу проверить        | , что он еще жив',
    '0119': 'У меня есть    | машина    | , и я хочу проверить        | , что она еще цела',
    '0256': 'У меня есть    | игрок     | , и я хочу проверить        | , что он еще жив',
    '010A': 'У меня есть    | игрок     | , и я хочу проверить        | кол-во денег на счету',
    '0226': 'У меня есть    | персонаж  | , и я хочу получить         | уровень его здоровья'
  },
};

function getNext(lines: string[][], level: number): TreeNode[] {
  const children = uniq(
    lines.filter((line) => line.length > level).map((line) => line[level])
  );

  return [
    ...lines
      .filter((line) => line.length <= level)
      .map((line) => {
        return { id: line[0], next: [] };
      }),

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
  on(loadStatements, (state, { lang }) => {
    const { dictionary, lines } = parseStatements(
      STATEMENTS[lang] || STATEMENTS['en'] || []
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

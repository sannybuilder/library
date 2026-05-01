import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  KeyValueEntry,
  ScmMap,
  ScmMapFileEntry,
  ScmTreeNode,
  ScmXrefItem,
} from '../../components/scm/model';
import { ScmState } from './reducer';
import { Game } from '../../models';
import {
  extractRefOffset,
  getFragment,
  normalizeScmPath,
  toLineNumber,
  toRefKey,
} from '../../utils';
import { game } from '../game/selectors';

export const state = createFeatureSelector<ScmState>('scm');

export const activeFileName = createSelector(
  state,
  (state: ScmState | undefined) => state?.activeFileName,
);

export const selectedLabelOffset = createSelector(
  state,
  (state: ScmState | undefined) => state?.selectedLabelOffset,
);

export const currentFile = createSelector(
  state,
  activeFileName,
  (state: ScmState | undefined, fileName: string | undefined) =>
    fileName ? state?.files[fileName] : undefined,
);

export const fileByName = createSelector(
  state,
  (state: ScmState | undefined, props: { name: string }) =>
    state?.files[props.name],
);

export const files = createSelector(
  state,
  (state: ScmState | undefined) => state?.files ?? {},
);

export const refsByGame = createSelector(
  state,
  (state: ScmState | undefined, props: { game: Game }) =>
    props.game ? (state?.refsByGame[props.game] ?? []) : [],
);

export const commentsByGame = createSelector(
  state,
  (state: ScmState | undefined, props: { game: Game }) =>
    props.game ? (state?.commentsByGame[props.game] ?? []) : [],
);

export const variablesByGame = createSelector(
  state,
  (state: ScmState | undefined, props: { game: Game }) =>
    props.game ? (state?.variablesByGame[props.game] ?? []) : [],
);

export const currentRefsOverlay = createSelector(
  state,
  game,
  (state: ScmState | undefined, game: Game | undefined) =>
    game ? (state?.refsByGame[game] ?? []) : [],
);

export const currentCommentsOverlay = createSelector(
  state,
  game,
  (state: ScmState | undefined, game: Game | undefined) =>
    game ? (state?.commentsByGame[game] ?? []) : [],
);

export const currentVariablesOverlay = createSelector(
  state,
  game,
  (state: ScmState | undefined, game: Game | undefined) =>
    game ? (state?.variablesByGame[game] ?? []) : [],
);

export const mapByGame = createSelector(
  state,
  (state: ScmState | undefined, props: { game: Game | undefined }) =>
    props.game ? state?.maps[props.game] : undefined,
);

export const currentMap = createSelector(
  state,
  game,
  (state: ScmState | undefined, game: Game | undefined) =>
    game ? state?.maps[game] : undefined,
);

export const treeByGame = createSelector(
  mapByGame,
  currentRefsOverlay,
  (map, overlay) => buildTree(map, overlay),
);

export const currentTree = createSelector(
  currentMap,
  currentRefsOverlay,
  (map, overlay) => buildTree(map, overlay),
);

export const xrefsByGame = createSelector(
  mapByGame,
  currentRefsOverlay,
  selectedLabelOffset,
  (map, overlay, offset) => buildXrefs(map, offset, overlay),
);

export const currentXrefs = createSelector(
  currentMap,
  currentRefsOverlay,
  selectedLabelOffset,
  (map, overlay, offset) => buildXrefs(map, offset, overlay),
);

export const currentFileLabelOffsets = createSelector(currentFile, (file) => {
  if (!file) {
    return [] as number[];
  }

  return file.refs
    .map((relativeOffset) => file.base + relativeOffset)
    .filter((offset, index, arr) => arr.indexOf(offset) === index)
    .sort((a, b) => a - b);
});

export const currentRefs = createSelector(
  currentFileLabelOffsets,
  currentRefsOverlay,
  (offsets, overlay) => {
    return offsets.map((offset) => {
      const key = toRefKey(offset);
      return {
        displayLabel: toDisplayLabel(key, offset, overlay),
        offset,
      };
    });
  },
);

function buildTree(
  map: ScmMap | undefined,
  overlay: KeyValueEntry[],
): ScmTreeNode[] {
  if (!map) {
    return [];
  }

  const groupsById = new Map<number, ScmMapFileEntry[]>();

  for (const file of map.files) {
    const list = groupsById.get(file.pid) ?? [];
    list.push(file);
    groupsById.set(file.pid, list);
  }

  return map.groups
    .map((groupName, pid) => {
      const files = (groupsById.get(pid) ?? []).slice();
      // .sort((a, b) => a.path.localeCompare(b.path));

      const children: ScmTreeNode[] = files
        .map((file) => {
          return {
            label: toTreeLabel(file.name, overlay),
            path: normalizeScmPath(file.path),
          };
        })
        .sort((a, b) => {
          if (a.label.startsWith('ref.') && b.label.startsWith('ref.')) {
            const aOffset = Number.parseInt(extractRefOffset(a.label), 10);
            const bOffset = Number.parseInt(extractRefOffset(b.label), 10);
            return aOffset - bOffset;
          }
          return a.label.localeCompare(b.label, undefined, {
            numeric: true,
            sensitivity: 'base',
          });
        });

      if (children.length === 1 && groupName === 'main') {
        return children[0];
      }

      return {
        label: toGroupTitle(groupName),
        children,
      };
    })
    .filter((node) => !!node.path || !!node.children?.length);
}

function toTreeLabel(path: string, overlay: KeyValueEntry[]): string {
  const entry = overlay.find((e) => e.key === path);
  return entry ? entry.value : leafName(path);
}

function leafName(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

function toGroupTitle(group: string): string {
  return group.length ? group[0].toUpperCase() + group.slice(1) : group;
}

function buildXrefs(
  map: ScmMap | undefined,
  offset: number | undefined,
  overlay: KeyValueEntry[],
): ScmXrefItem[] {
  if (!map || typeof offset !== 'number') {
    return [];
  }

  const key = toRefKey(offset);
  const refs = map.xrefs[key] ?? [];
  return refs.map((source) => resolveXref(map, source, overlay));
}

function resolveXref(
  map: ScmMap,
  source: string,
  overlay: KeyValueEntry[],
): ScmXrefItem {
  const [fileIndexRaw, lineIndexRaw] = source.split(':');
  const fileIndex = Number.parseInt(fileIndexRaw, 10);
  const lineIndex = parseLineIndex(lineIndexRaw);
  const lineNumber = toLineNumber(lineIndex);

  if (!Number.isFinite(fileIndex)) {
    return {
      source,
      lineIndex,
      lineNumber,
      fragment: getFragment(lineIndex),
    };
  }

  const target = map.files[fileIndex];
  const targetPath = target ? normalizeScmPath(target.path) : undefined;
  return {
    source,
    targetName: target ? toTreeLabel(target.name, overlay) : undefined,
    targetPath,
    lineIndex,
    lineNumber,
    fragment: getFragment(lineIndex),
  };
}

function parseLineIndex(raw: string | undefined): number | undefined {
  if (!raw) {
    return undefined;
  }

  const value = Number.parseInt(raw, 10);
  return Number.isNaN(value) ? undefined : value;
}

function toDisplayLabel(
  refKey: string,
  offset: number,
  overlay: KeyValueEntry[],
): string {
  const entry = overlay.find((e) => e.key === refKey);
  if (entry) {
    return `:${entry.value}`;
  }

  return `:label_${offset.toString()}`;
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { uniqBy } from 'lodash';
import { doesGameRequireOpcode, isSupported } from '../../utils';
import {
  ClassMeta,
  Command,
  DEFAULT_EXTENSION,
  Extension,
  Game,
  SupportInfo,
} from '../../models';
import { game } from '../game/selectors';
import { ExtensionsState, GameState } from './reducer';

export const extensionsState =
  createFeatureSelector<ExtensionsState>('extensions');

export const state = createSelector(
  extensionsState,
  game,
  (state: ExtensionsState, game: Game | undefined) =>
    game ? state.games[game] : undefined
);

export const extensions = createSelector(
  state,
  (state: GameState | undefined) => state?.extensions
);

export const entities = createSelector(
  state,
  (state: GameState | undefined) => state?.entities
);

export const gameExtensions = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.extensions ?? []
);

export const extensionNames = createSelector(
  extensions,
  (extensions?: Extension[]) =>
    extensions ? extensions.map((e) => e.name) : []
);

export const extensionCommands = createSelector(
  extensions,
  (extensions: Extension[] | undefined, props: { extension: string }) =>
    extensions?.find((e) => e.name === props.extension)?.commands
);

export const extensionCommand = createSelector(
  extensions,
  (
    extensions: Extension[] | undefined,
    props: { extension: string; id: string }
  ) =>
    extensions
      ?.find((e) => e.name === props.extension)
      ?.commands?.find((c) => (c.id || c.name) === props.id)
);

export const loading = createSelector(
  state,
  (state: GameState | undefined) => state?.loading
);

export const loadingError = createSelector(
  state,
  (state: GameState | undefined) => state?.loadingError
);

export const extensionEntities = createSelector(
  state,
  (state: GameState | undefined, props: { extension: string }) =>
    state?.entities?.[props.extension] ?? []
);

export const lastUpdate = createSelector(
  state,
  (state: GameState | undefined) => state?.lastUpdate
);

export const supportInfo = createSelector(
  state,
  (state: GameState | undefined) => state?.supportInfo
);

export const commandSupportInfo = createSelector(
  supportInfo,
  (
    supportInfo: SupportInfo | undefined,
    props: { command: Command; extension: string }
  ) => {
    const extension = supportInfo?.[props.extension];
    if (!extension) {
      return;
    }
    return extension[props.command.id || props.command.name];
  }
);

export const commandRelated = createSelector(
  extensions,
  (
    extensions: Extension[] | undefined,
    props: { extension: string; command: Command; game: Game }
  ) => {
    const commands = extensions?.find(
      (e) => e.name === props.extension
    )?.commands;

    if (!commands) {
      return;
    }

    const { id, name, class: className, member, attrs } = props.command;
    const re = new RegExp(`\\b${id}\\b|\\b${name}\\b`);
    const referenced = commands.filter(
      (c) => c.short_desc && re.test(c.short_desc)
    );

    const overloads = attrs?.is_overload
      ? commands.filter((c) => {
          const hasSameId = c.id === id;
          const hasSameName = c.name === name;
          const hasSameClass =
            c.class && c.member && c.class === className && c.member === member;

          return (!id || !hasSameId) && (hasSameName || hasSameClass);
        })
      : [];

    const variations = makeVariations(
      name,
      {
        starters: [['GET_', 'SET_']],
        endings: [
          ['_CHAR', '_CAR', '_PLAYER', '_OBJECT'],
          ['_ON', '_OFF'],
          ['_VAR', '_LVAR', '_CONST'],
        ],
        middle: [
          ['_VAR_', '_LVAR_'],
          ['_GLOBAL_VAR_', '_LOCAL_VAR_'],
        ],
      },
      commands
    );
    const methodVariations =
      className && member
        ? makeMethodVariations(
            className,
            member,
            {
              starters: [['Get', 'Set']],
              endings: [['On', 'Off']],
            },
            commands
          )
        : [];
    const key = doesGameRequireOpcode(props.game) ? 'id' : 'name';
    return uniqBy(
      [...referenced, ...overloads, ...variations, ...methodVariations],
      key
    ).filter((c) => isSupported(c.attrs));
  }
);

export const gameVersion = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.version
);

export const version = createSelector(
  state,
  (state: GameState | undefined) => state?.version
);

export const classOrigin = createSelector(
  extensions,
  (extensions: Extension[] | undefined, props: { className: string }) =>
    extensions?.find((e) => e.commands.some((c) => c.class === props.className))
      ?.name ?? DEFAULT_EXTENSION
);

export const gameClassesMeta = createSelector(
  extensionsState,
  (state: ExtensionsState, props: { game: Game }) =>
    state.games[props.game]?.classesMeta ?? []
);

export const classMeta = createSelector(
  gameClassesMeta,
  (classesMeta: ClassMeta[], props: { game: Game; className: string }) =>
    classesMeta.find((m) => m.name === props.className)
);

export const classesMeta = createSelector(
  state,
  (state: GameState | undefined) => state?.classesMeta
);

export const commandsToDelete = createSelector(
  state,
  (state: GameState | undefined) => state?.commandsToDelete
);

function makeVariations(
  name: string,
  {
    starters,
    endings,
    middle,
  }: { starters: string[][]; endings: string[][]; middle: Array<[string, string]> },
  commands: Command[]
) {
  const variations: Command[] = [];
  const addVariant = (variant: string) => {
    const v = commands.find((c) => c.name === variant);
    if (v) {
      variations.push(v);
    }
  };

  starters.forEach((s) => {
    s.forEach((prefix) => {
      if (name.startsWith(prefix)) {
        const baseName = name.replace(prefix, '');
        s.filter((o) => !name.startsWith(o)).forEach((o) =>
          addVariant(o + baseName)
        );
      }
    });
  });

  endings.forEach((e) => {
    e.forEach((suffix) => {
      if (name.endsWith(suffix)) {
        const baseName = name.replace(/_[A-Z]+$/, '');
        e.filter((o) => !name.endsWith(o)).forEach((o) =>
          addVariant(baseName + o)
        );
      }
    });
  });

  middle.forEach(([m0, m1]) => {
    if (name.includes(m0)) {
      addVariant(name.replace(m0, m1));
    } else if (name.includes(m1)) {
      addVariant(name.replace(m1, m0));
    }
  });

  return variations;
}

function makeMethodVariations(
  className: string,
  method: string,
  { starters, endings }: { starters: string[][]; endings: string[][] },
  commands: Command[]
) {
  const variations: Command[] = [];
  const addVariant = (className: string, method: string) => {
    const v = commands.find(
      (c) => c.class === className && c.member === method
    );
    if (v) {
      variations.push(v);
    }
  };

  starters.forEach((s) => {
    s.forEach((prefix) => {
      if (method.startsWith(prefix)) {
        const baseName = method.replace(prefix, '');
        s.filter((o) => !method.startsWith(o)).forEach((o) =>
          addVariant(className, o + baseName)
        );
      }
    });
  });

  endings.forEach((e) => {
    e.forEach((suffix) => {
      let pos = method.lastIndexOf(suffix);
      if (pos >= 0) {
        const baseName = method.substring(0, pos);
        e.filter((o) => !method.endsWith(o)).forEach((o) =>
          addVariant(className, baseName + o)
        );
      }
    });
  });

  return variations;
}

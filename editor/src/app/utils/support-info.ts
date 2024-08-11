import { areTypesCompatible, isSupported } from './command';
import {
  Command,
  DEFAULT_EXTENSION,
  Extension,
  Game,
  GameSupportInfo,
  PackedSupportInfo,
  SupportInfo,
  SupportLevel,
} from '../models';
import { doesGameRequireOpcode, getBaseGame } from './game';

export function getPackedSupportInfo(
  extensions: Extension[],
  state: Record<Game, { extensions: Extension[] } | undefined>,
  game: Game
) {
  return extensions.reduce((m, { name, commands }) => {
    m[name] = commands.reduce((m2, command) => {
      m2[command.id || command.name] = (Object.keys(state) as Game[]).map(
        (otherGame) => {
          const { extension, command: otherCommand } =
            getCommand(
              state[otherGame]?.extensions,
              command,
              getMatchingKey(game, otherGame)
            ) || {};
          return [
            getSupportLevel(
              game === otherGame ? command : otherCommand,
              command
            ),
            extension === DEFAULT_EXTENSION ? '' : extension,
          ];
        }
      );
      return m2;
    }, {} as Record<string, PackedSupportInfo[]>);
    return m;
  }, {} as Record<string, Record<string, PackedSupportInfo[]>>);
}

export function unpackSupportInfo(
  data: Record<Game, Record<string, Record<string, PackedSupportInfo[]>>>
): Record<Game, SupportInfo> {
  const idToGame = Object.values(Game);
  return Object.entries(data).reduce((m, [game, supportInfo]) => {
    m[game as Game] = Object.entries(supportInfo).reduce(
      (m2, [ext, commands]) => {
        m2[ext] = Object.entries(commands).reduce((m3, [name, infos]) => {
          m3[name] = infos
            .slice(0, idToGame.length)
            .map(([level, extension], id) => ({
              game: idToGame[id],
              level,
              extension: extension === '' ? DEFAULT_EXTENSION : extension,
            }));
          return m3;
        }, {} as Record<string, GameSupportInfo[]>);
        return m2;
      },
      {} as SupportInfo
    );
    return m;
  }, {} as Record<Game, SupportInfo>);
}

export function getSupportInfo(
  extensions: Extension[],
  state: Record<Game, { extensions: Extension[] } | undefined>,
  game: Game
): SupportInfo {
  return extensions.reduce((m, { name, commands }) => {
    m[name] = commands.reduce((m2, command) => {
      m2[command.id || command.name] = (Object.keys(state) as Game[]).map(
        (otherGame) => {
          const { extension, command: otherCommand } =
            getCommand(
              state[otherGame]?.extensions,
              command,
              getMatchingKey(game, otherGame)
            ) || {};
          return {
            game: otherGame,
            level: getSupportLevel(
              game === otherGame ? command : otherCommand,
              command
            ),
            extension,
          };
        }
      );
      return m2;
    }, {} as Record<string, GameSupportInfo[]>);
    return m;
  }, {} as SupportInfo);
}

function getSupportLevel(command: Command | undefined, otherCommand: Command) {
  // no command with the same id
  if (!command) {
    return SupportLevel.DoesNotExist;
  }

  const attrs = command.attrs || {};
  const otherAttrs = otherCommand.attrs || {};

  const { is_nop, is_unsupported } = attrs;
  if (is_unsupported) {
    return SupportLevel.Unsupported;
  }
  if (is_nop) {
    return SupportLevel.Nop;
  }

  // same ids, but different names (e.g. 03E2)
  if (command.name !== otherCommand.name) {
    return SupportLevel.Unsupported;
  }

  if (
    otherCommand.num_params !== command.num_params &&
    !otherAttrs.is_unsupported
  ) {
    return SupportLevel.SupportedDiffParams;
  }

  // same number of parameters but different types (e.g. Garage)
  const p1 = command.input?.length ?? 0;
  const p2 = otherCommand.input?.length ?? 0;
  if (p1 === p2 && p1 > 0 && isSupported(otherAttrs)) {
    const types1 = command.input?.map((p) => p.type) ?? [];
    const types2 = otherCommand.input?.map((p) => p.type) ?? [];

    for (let i = 0; i < p1; i += 1) {
      if (!areTypesCompatible(types1[i], types2[i])) {
        return SupportLevel.SupportedDiffParams;
      }
    }
  }

  return SupportLevel.Supported;
}

function getCommand(
  extensions: Extension[] | undefined,
  command: Command,
  key: 'id' | 'name'
): { command: Command; extension: string } | undefined {
  if (!extensions) {
    return;
  }
  const matcher = (c: Command) => c[key] === command[key];
  for (const extension of extensions) {
    const command = extension.commands.find(matcher);
    if (command) {
      return { command, extension: extension.name };
    }
  }
  return undefined;
}

export function getMatchingKey(game: Game, otherGame: Game): 'id' | 'name' {
  if ([getBaseGame(game), getBaseGame(otherGame)].includes(Game.unknown_x86)) {
    return 'name';
  }

  return doesGameRequireOpcode(game) && doesGameRequireOpcode(otherGame)
    ? 'id'
    : 'name';
}

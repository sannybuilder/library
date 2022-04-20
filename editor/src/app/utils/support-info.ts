import { areTypesCompatible } from './command';
import {
  Command,
  Extension,
  Game,
  GameSupportInfo,
  SupportInfo,
  SupportLevel,
} from '../models';

export function getSupportInfo(
  extensions: Extension[],
  state: Record<Game, { extensions: Extension[] } | undefined>,
  game: Game
): SupportInfo {
  return extensions.reduce((m, { name, commands }) => {
    m[name] = commands.reduce((m2, command) => {
      m2[command.id || command.name] = (Object.keys(state) as Game[]).map(
        (v3) => {
          const { extension, command: otherCommand } =
            getCommand(state[v3]?.extensions, command) || {};
          return {
            game: v3,
            level: getSupportLevel(
              game === v3 ? command : otherCommand,
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
  if (p1 === p2 && p1 > 0 && !otherAttrs.is_nop && !otherAttrs.is_unsupported) {
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
  command: Command
): { command: Command; extension: string } | undefined {
  if (!extensions) {
    return;
  }
  const matcher = (c: Command) =>
    c.id && command.id ? c.id === command.id : c.name === command.name;
  for (const extension of extensions) {
    const command = extension.commands.find(matcher);
    if (command) {
      return { command, extension: extension.name };
    }
  }
  return undefined;
}

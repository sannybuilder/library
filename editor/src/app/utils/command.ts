import { camelCase, pickBy } from 'lodash';
import {
  Game,
  Param,
  SourceType,
  SupportLevel,
  GameSupportInfo,
  Command,
} from '../models';

// remove all falsy properties from an object and return undefined if the object is an empty object {}
export function smash(value: object) {
  const compressed = pickBy(value, (x) => x);
  if (Object.keys(compressed).length > 0) {
    return compressed;
  }
  return undefined;
}

export function stripSourceAny(param: Param) {
  return pickBy(param, (v, k) =>
    k === 'source' ? v !== SourceType.any : true
  );
}

export function getSameCommands(
  supportInfo: GameSupportInfo[] | undefined,
  game: Game
): GameSupportInfo[] {
  if (!supportInfo) {
    return [{ game, level: SupportLevel.Supported }];
  }
  const curr = supportInfo.find((i) => i.game === game)!;
  // also update the same command in other games
  const others =
    curr.level === SupportLevel.Supported
      ? supportInfo.filter(
          (i) => i.game !== game && i.level === SupportLevel.Supported
        )
      : [];

  return [curr, ...others];
}

export function commandParams(command: Command) {
  return [...inputParams(command), ...outputParams(command)];
}

export function inputParams(command: Command) {
  return command?.input ?? [];
}

export function outputParams(command: Command) {
  return command?.output ?? [];
}

export function replaceType(
  params: Param[] | undefined,
  oldType: string,
  newType: string
) {
  if (!params) {
    return params;
  }

  return params.map((p) => ({
    ...p,
    type: p.type === oldType ? newType : p.type,
  }));
}

export function formatParamName(name: string) {
  return name.startsWith('_') ? name : camelCase(name);
}

export function formatCommandName(name: string | undefined) {
  return name ? name.replace(/[\s-]/g, '_').toUpperCase() : name;
}

export function formatOpcode(opcode: string) {
  return opcode ? opcode.toUpperCase() : opcode;
}

export function normalizeId(id: string): string {
  if (id.length !== 4) {
    return id;
  }
  if (id[0] === '8') {
    // normalize negative form
    return '0' + id.slice(1);
  }
  return id;
}

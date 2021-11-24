import { camelCase, intersection, pickBy } from 'lodash';
import {
  Game,
  Param,
  SourceType,
  SupportLevel,
  GameSupportInfo,
  Command,
  Platform,
  GamePlatforms,
  Version,
  GameVersions,
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

export function getQueryParamsForCommand(command: Command, game: Game) {
  const platforms = command.platforms ?? [];
  const versions = command.versions ?? [];

  const p = platforms.reduce((m, v) => {
    if (v === Platform.Any) {
      return m;
    }
    return m | (1 << GamePlatforms[game].indexOf(v));
  }, 0);
  const v = versions.reduce((m, v) => {
    if (v === Version.Any) {
      return m;
    }
    return m | (1 << GameVersions[game].indexOf(v));
  }, 0);

  return { p: p || undefined, v: v || undefined };
}

export function decodePlatforms(platform: number | undefined, game: Game) {
  if (!platform) {
    return [Platform.Any];
  }
  return GamePlatforms[game].filter((p, i) => (platform & (1 << i)) !== 0);
}

export function decodeVersions(version: number | undefined, game: Game) {
  if (!version) {
    return [Version.Any];
  }
  return GameVersions[game].filter((p, i) => (version & (1 << i)) !== 0);
}

export function isPlatformMatching(
  command: Command,
  platforms: Platform[]
): boolean {
  if (platforms.includes(Platform.Any)) {
    return true;
  }
  const commandPlatforms = command.platforms ?? [Platform.Any];
  if (commandPlatforms.includes(Platform.Any)) {
    return true;
  }
  return intersection(platforms, commandPlatforms).length > 0;
}

export function isVersionMatching(
  command: Command,
  versions: Version[]
): boolean {
  if (versions.includes(Version.Any)) {
    return true;
  }
  const commandVersions = command.versions ?? [Version.Any];
  if (commandVersions.includes(Version.Any)) {
    return true;
  }
  return intersection(versions, commandVersions).length > 0;
}

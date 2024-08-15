import {
  camelCase,
  difference,
  intersection,
  pickBy,
  sortBy,
  upperFirst,
} from 'lodash';
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
  PrimitiveType,
  Attr,
  Extension,
  ViewContext,
  Attribute,
} from '../models';
import { HEX_DIGITS, HEX_NEGATION } from './hex';

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

export function formatCommandNameScreaming(name: string | undefined) {
  if (!name) {
    return name;
  }
  let formatted = name.replace(/[\s-]/g, '_');
  if (name.startsWith('0x') || name.startsWith('0X')) {
    return `0x${formatted.slice(2).toUpperCase()}`;
  }
  return formatted.toUpperCase();
}

export function formatCommandNameUpFirst(name: string | undefined) {
  return name ? upperFirst(name) : name;
}

export function getDefaultCommandNameFormatter(game: Game) {
  if (game === Game.bully) {
    return formatCommandNameUpFirst;
  }
  return formatCommandNameScreaming;
}

export function formatOpcode(opcode: string) {
  return opcode ? opcode.toUpperCase() : opcode;
}

export function normalizeId(id: string): string {
  if (!isOpcode(id)) {
    return id;
  }
  if (HEX_NEGATION[id[0]]) {
    // normalize negative form
    return HEX_NEGATION[id[0]] + id.slice(1);
  }
  return id;
}

export function getQueryParamsForCommand(command: Command, game: Game) {
  const platforms = command.platforms ?? [];
  const versions = command.versions ?? [];

  const p =
    platforms.reduce((m, v) => {
      if (v === Platform.Any) {
        return m;
      }
      const index = GamePlatforms[game].indexOf(v);
      if (index === -1) {
        return m;
      }
      return m | (1 << index);
    }, 0) || undefined;
  const v =
    versions.reduce((m, v) => {
      if (v === Version.Any) {
        return m;
      }
      const index = GameVersions[game].indexOf(v);
      if (index === -1) {
        return m;
      }
      return m | (1 << index);
    }, 0) || undefined;

  return { p, v };
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

export function isPlatformMatchingExact(
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
  return matchArrays(platforms, commandPlatforms);
}

export function isVersionMatchingExact(
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
  return matchArrays(versions, commandVersions);
}

export function matchArrays<T>(
  a1: T[] | undefined,
  a2: T[] | undefined
): boolean {
  const arr1 = a1 ?? [];
  const arr2 = a2 ?? [];
  const len1 = arr1.length;
  const len2 = arr2.length;

  if (len1 !== len2) {
    return false;
  }
  return difference(arr1, arr2).length === 0;
}

export function primitiveTypes(
  game: Game,
  viewContext: ViewContext
): PrimitiveType[] {
  if (viewContext === ViewContext.Code) {
    return [
      PrimitiveType.any,
      PrimitiveType.boolean,
      PrimitiveType.float,
      PrimitiveType.int,
      PrimitiveType.string,
    ];
  }
  const types = [
    PrimitiveType.any,
    PrimitiveType.arguments,
    PrimitiveType.boolean,
    PrimitiveType.float,
    PrimitiveType.int,
    PrimitiveType.label,
    PrimitiveType.string,
    PrimitiveType.model_any,
    PrimitiveType.model_char,
    PrimitiveType.model_object,
    PrimitiveType.model_vehicle,
    PrimitiveType.gxt_key,
    PrimitiveType.zone_key,
  ];

  if (game === Game.sa) {
    types.push(PrimitiveType.string128, PrimitiveType.int_script_id);
  }

  if (game === Game.gta_iv) {
    types.push(PrimitiveType.vector3);
  }
  return types.sort();
}

function isPrimitive(type: string) {
  return Object.values(PrimitiveType).includes(type as PrimitiveType);
}

function isInt(type: string) {
  return [
    PrimitiveType.int,
    PrimitiveType.boolean,
    PrimitiveType.int_script_id,
    PrimitiveType.label,
    PrimitiveType.model_any,
    PrimitiveType.model_char,
    PrimitiveType.model_object,
    PrimitiveType.model_vehicle,
  ].includes(type as PrimitiveType);
}

function isFloat(type: string) {
  return type === PrimitiveType.float;
}

function isString(type: string) {
  return [
    PrimitiveType.gxt_key,
    PrimitiveType.string,
    PrimitiveType.string128,
    PrimitiveType.zone_key,
  ].includes(type as PrimitiveType);
}

export function areTypesCompatible(type1: string, type2: string) {
  if (type1 === type2 || [type1, type2].includes(PrimitiveType.any)) {
    return true;
  }

  const isInt1 = isInt(type1);
  const isInt2 = isInt(type2);

  if (isInt1 || isInt2) {
    if ((isInt1 && isInt2) || !isPrimitive(type1) || !isPrimitive(type2)) {
      return true;
    }
    return false;
  }

  if (isFloat(type1) && isFloat(type2)) {
    return true;
  }

  if (isString(type1) && isString(type2)) {
    return true;
  }

  return false;
}

export function isOpcode(s: string): boolean {
  return s.length === 4 && s.split('').every((c) => HEX_DIGITS.includes(c));
}

export function isSupported(attrs?: Partial<Attr>): boolean {
  return !attrs?.is_unsupported && !attrs?.is_nop;
}

export function stringifyCommandWithOperator<
  Cb extends (param: Param, i: number) => string
>(command: Command, onInput: Cb, onOutput: Cb) {
  const output = outputParams(command);
  const input = inputParams(command);

  if (input.length == 1 && !output.length) {
    // unary
    return `${command.operator}${onInput(input[0], 0)}`;
  }
  if (output.length) {
    // binary not
    if (command.operator === '~') {
      return `${onOutput(output[0], 0)} = ~${onInput(input[0], 0)}`;
    }

    // ternary
    return `${onOutput(output[0], 0)} = ${onInput(input[0], 0)} ${
      command.operator
    } ${onInput(input[1], 1)}`;
  }

  switch (command.operator) {
    // assignment or comparison
    case '=':
    case '+=@':
    case '-=@':
    case '=#':
    case '==':
    case '>':
    case '>=': {
      return `${onInput(input[0], 0)} ${command.operator} ${onInput(
        input[1],
        1
      )}`;
    }

    // compound assignment
    default: {
      return `${onInput(input[0], 0)} ${command.operator}= ${onInput(
        input[1],
        1
      )}`;
    }
  }
}

export function normalize(extensions: Extension[], game: Game) {
  return extensions
    .map((e) => ({
      ...e,
      commands: sortBy(
        e.commands.map((c) => {
          const isUnsupported = !!c.attrs?.is_unsupported;
          return pickBy(
            {
              ...c,
              id: c.id || null,
              attrs: c.attrs ? smash(c.attrs) : c.attrs,
              class: isUnsupported || !c.class ? null : c.class,
              member: isUnsupported || !c.member ? null : c.member,
              short_desc: isUnsupported ? null : c.short_desc,
              input: isUnsupported ? null : c.input?.map(stripSourceAny),
              output: isUnsupported ? null : c.output?.map(stripSourceAny),
              num_params: isUnsupported ? 0 : c.num_params,
              versions: isVersioned(game) ? c.versions : [],
              platforms: isPlatformed(game) ? c.platforms : [],
            },
            (x) => x != null && (!Array.isArray(x) || x.length > 0)
          );
        }, 'id')
      ),
    }))
    .filter((e) => e.commands.length > 0);
}

function isVersioned(game: Game): boolean {
  return GameVersions[game].length > 1;
}

function isPlatformed(game: Game): boolean {
  return GamePlatforms[game].length > 1;
}

export function filterAttributes(
  attrs: Attribute[],
  game: Game,
  viewContext: ViewContext
): Attribute[] {
  return attrs.filter((a) => {
    switch (a) {
      case 'is_branch': // 0002, 004D
      case 'is_positional': // 024F
      case 'is_segment': // 0002
        return (
          [
            Game.gta3,
            Game.gta3_mobile,
            Game.gta3_unreal,
            Game.vc,
            Game.vc_mobile,
            Game.vc_unreal,
            Game.sa,
            Game.sa_mobile,
            Game.sa_unreal,
            Game.lcs,
            Game.vcs,
          ].includes(game) && viewContext === ViewContext.Script
        );

      case 'is_unsupported':
        return viewContext === ViewContext.Script;

      default:
        return true;
    }
  });
}

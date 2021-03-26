import { pickBy } from 'lodash';
import {
  Game,
  Param,
  SourceType,
  SupportLevel,
  GameSupportInfo,
} from '../models';

// remove all falsy properties from an object and return undefined if the object is an empty object {}
export function smash(value: object) {
  const compressed = pickBy(value, (x) => x);
  if (Object.keys(compressed).length > 0) {
    return compressed;
  }
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
  const curr = supportInfo.find((i) => i.game === game);
  // also update the same command in other games
  const others =
    curr.level === SupportLevel.Supported
      ? supportInfo.filter(
          (i) => i.game !== game && i.level === SupportLevel.Supported
        )
      : [];

  return [curr, ...others];
}

import { flatten } from 'lodash';
import { Game } from '../models';

export const GameEditions = {
  [Game.gta3]: [Game.gta3, Game.gta3_mobile, Game.gta3_unreal],
  [Game.vc]: [Game.vc, Game.vc_mobile, Game.vc_unreal],
  [Game.sa]: [Game.sa, Game.sa_mobile, Game.sa_unreal],
  [Game.unknown_x86]: [Game.unknown_x86, Game.unknown_x64, Game.gta_iv],
};

export function isValidGame(name: string | undefined): name is Game {
  if (!name) {
    return false;
  }

  return flatten(Object.values(GameEditions)).includes(name as Game);
}

export function getBaseGames(): Game[] {
  return Object.keys(GameEditions) as Game[];
}

export function getBaseGame(game: Game): Game {
  return (
    (Object.entries(GameEditions).find(([_, v]) =>
      v.includes(game)
    )?.[0] as Game) ?? game
  );
}

export function getGameVariations(game: Game): Game[] {
  const edition =
    Object.values(GameEditions).find((v) => v!.includes(game)) ??
    GameEditions[Game.unknown_x86];

  return edition?.filter((g) => g !== game) ?? [];
}

export function getSameEdition(game: Game): Game[] {
  switch (game) {
    case Game.gta3:
    case Game.vc:
    case Game.sa:
      return [Game.gta3, Game.vc, Game.sa];
    case Game.gta3_mobile:
    case Game.vc_mobile:
    case Game.sa_mobile:
      return [Game.gta3_mobile, Game.vc_mobile, Game.sa_mobile];
    case Game.gta3_unreal:
    case Game.vc_unreal:
    case Game.sa_unreal:
      return [Game.gta3_unreal, Game.vc_unreal, Game.sa_unreal];
    case Game.unknown_x86:
      return [Game.unknown_x86, Game.unknown_x64];
    case Game.unknown_x64:
      return [Game.unknown_x86, Game.unknown_x64];
    default:
      return [game];
  }
}

export function doesGameRequireOpcode(game: Game): boolean {
  return [
    Game.gta3,
    Game.vc,
    Game.sa,
    Game.gta3_mobile,
    Game.vc_mobile,
    Game.sa_mobile,
    Game.gta3_unreal,
    Game.vc_unreal,
    Game.sa_unreal,
  ].includes(game);
}

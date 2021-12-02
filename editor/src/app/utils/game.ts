import { flatten } from 'lodash';
import { Game } from '../models';

const GameEditions = {
  [Game.GTA3]: [Game.GTA3, Game.gta3_mobile, Game.gta3_unreal],
  [Game.VC]: [Game.VC, Game.vc_mobile, Game.vc_unreal],
  [Game.SA]: [Game.SA, Game.sa_mobile, Game.sa_unreal],
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
  return (
    Object.values(GameEditions)
      .find((v) => v!.includes(game))
      ?.filter((g) => g !== game) ?? []
  );
}

export function getSameEdition(game: Game): Game[] {
  switch (game) {
    case Game.GTA3:
    case Game.VC:
    case Game.SA:
      return [Game.GTA3, Game.VC, Game.SA];
    case Game.gta3_mobile:
    case Game.vc_mobile:
    case Game.sa_mobile:
      return [Game.gta3_mobile, Game.vc_mobile, Game.sa_mobile];
    case Game.gta3_unreal:
    case Game.vc_unreal:
    case Game.sa_unreal:
      return [Game.gta3_unreal, Game.vc_unreal, Game.sa_unreal];
  }
}

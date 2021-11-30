import { Game } from '../models';

export function isValidGame(name: string | undefined): name is Game {
  if (!name) {
    return false;
  }
  const names: string[] = [
    Game.GTA3,
    Game.gta3_mobile,
    Game.gta3_unreal,
    Game.VC,
    Game.vc_mobile,
    Game.vc_unreal,
    Game.SA,
    Game.sa_mobile,
    Game.sa_unreal,
  ];
  return names.includes(name);
}

export function getBaseGame(game: Game): Game {
  switch (game) {
    case Game.gta3_mobile:
    case Game.gta3_unreal:
      return Game.GTA3;
    case Game.vc_mobile:
    case Game.vc_unreal:
      return Game.VC;
    case Game.sa_mobile:
    case Game.sa_unreal:
      return Game.SA;
  }
  return game;
}

export function getGameVariations(name: Game): Game[] {
  switch (name) {
    case Game.GTA3:
      return [Game.gta3_mobile, Game.gta3_unreal];
    case Game.VC:
      return [Game.vc_mobile, Game.vc_unreal];
    case Game.SA:
      return [Game.sa_mobile, Game.sa_unreal];
  }
  return [];
}

export function getBaseGames(): Game[] {
  return [Game.GTA3, Game.VC, Game.SA];
}

export function getSamePlatformAndVersion(game: Game): Game[] {
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

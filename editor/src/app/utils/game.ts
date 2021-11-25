import { Game, GameName } from '../models';

export function isValidGameName(name: string | undefined): name is GameName {
  if (!name) {
    return false;
  }
  const names: string[] = [
    GameName.gta3,
    GameName.gta3_classic,
    GameName.gta3_mobile,
    GameName.gta3_unreal,
    GameName.vc,
    GameName.vc_classic,
    GameName.vc_mobile,
    GameName.vc_unreal,
    GameName.sa,
    GameName.sa_classic,
    GameName.sa_mobile,
    GameName.sa_unreal,
  ];
  return names.includes(name);
}

export function getGameByName(name: GameName): Game {
  if (
    [
      GameName.gta3,
      GameName.gta3_classic,
      GameName.gta3_mobile,
      GameName.gta3_unreal,
    ].includes(name as GameName)
  ) {
    return Game.GTA3;
  }
  if (
    [
      GameName.vc,
      GameName.vc_classic,
      GameName.vc_mobile,
      GameName.vc_unreal,
    ].includes(name as GameName)
  ) {
    return Game.VC;
  }
  if (
    [
      GameName.sa,
      GameName.sa_classic,
      GameName.sa_mobile,
      GameName.sa_unreal,
    ].includes(name as GameName)
  ) {
    return Game.SA;
  }

  throw new Error('unknown game name');
}

import { Game } from '../models';

export function getGameByName(name: string | undefined): Game | undefined {
  if (name === 'gta3' || name === 'gta3_mobile' || name === 'gta3_unreal') {
    return Game.GTA3;
  }
  if (name === 'vc' || name === 'vc_mobile' || name === 'vc_unreal') {
    return Game.VC;
  }
  if (name === 'sa' || name === 'sa_mobile' || name === 'sa_unreal') {
    return Game.SA;
  }

  return undefined;
}

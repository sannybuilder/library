import { Game } from 'src/app/models';
import { Config } from '../app/config';

export const environment: Config = {
  production: true,

  features: {
    editing: false,
  },
  endpoints: {
    commands: {
      [Game.GTA3]: 'assets/gta3.json',
      [Game.VC]: 'assets/vc.json',
    },
  },
};

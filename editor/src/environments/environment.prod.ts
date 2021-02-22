import { Game } from 'src/app/models';
import { Config } from '../app/config';

export const environment: Config = {
  production: true,

  features: {
    editing: false,
  },
  endpoints: {
    commands: {
      [Game.GTA3]: 'data/gta3-scl.json',
      [Game.VC]: 'data/vc-scl.json',
    },
  },
};

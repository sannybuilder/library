import { Game } from 'src/app/models';
import { Config } from '../app/config';

export const environment: Config = {
  production: true,

  features: {
    editing: false,
  },
  endpoints: {
    commands: {
      [Game.GTA3]:
        'https://raw.githubusercontent.com/sannybuilder/library/master/editor/data/gta3.json',
      [Game.VC]:
        'https://raw.githubusercontent.com/sannybuilder/library/master/editor/data/vc.json',
    },
  },
};

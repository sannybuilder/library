import { Game } from '../app/models';
import { Config } from '../app/config';

export const environment: Config = {
  production: true,

  features: {
    editing: true,
  },
  endpoints: {
    snippets: {
      [Game.GTA3]: '/assets/gta3_snippets.json',
      [Game.VC]: '/assets/vc_snippets.json',
    },
  },
};

import { Game } from '../app/models';
import { Config } from '../app/config';

export const environment: Config = {
  production: true,

  features: {
    shouldBeAuthorizedToEdit: true,
  },
  endpoints: {
    snippets: {
      [Game.GTA3]: '/assets/gta3_snippets.json',
      [Game.VC]: '/assets/vc_snippets.json',
    },
    extensions: {
      [Game.GTA3]:
        'https://raw.githubusercontent.com/sannybuilder/library/master/gta3/gta3.json',
      [Game.VC]:
        'https://raw.githubusercontent.com/sannybuilder/library/master/vc/vc.json',
    },
    oauth: 'https://github.com/login/oauth/authorize',
    user: 'https://api.github.com/user',
  },
};

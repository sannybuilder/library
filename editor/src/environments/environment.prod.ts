import { Config } from '../app/config';

export const environment: Config = {
  production: true,

  features: {
    shouldBeAuthorizedToEdit: true,
  },
  endpoints: {
    oauth: 'https://github.com/login/oauth/authorize',
    user: 'https://api.github.com/user',
  },
};

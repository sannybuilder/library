import { Config } from '../app/config';

export const environment: Config = {
  production: true,
  cookieDomain: '.sannybuilder.com',
  features: {
    shouldBeAuthorizedToEdit: true,
  },
  endpoints: {
    base: 'https://raw.githubusercontent.com/sannybuilder/library/dev',
    oauth: 'https://github.com/login/oauth/authorize',
    user: 'https://api.github.com/user',
    contents: 'https://api.github.com/repos/sannybuilder/library/contents?ref=dev',
  },
};

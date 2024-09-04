import { Config } from '../app/config';

export const environment: Config = {
  production: true,
  cookieDomain: '.sannybuilder.com',
  features: {
    shouldBeAuthorizedToEdit: true,
    analytics: true,
    shouldDisplaySearchHelpOnInitialLoad: false,
  },
  endpoints: {
    base: 'https://raw.githubusercontent.com/sannybuilder/library/master',
    oauth: 'https://github.com/login/oauth/authorize',
    user: 'https://api.github.com/user',
    contents: 'https://api.github.com/repos/sannybuilder/library/contents',
    tree: 'https://api.github.com/repos/sannybuilder/library/git/trees/HEAD?recursive=1',
  },
};

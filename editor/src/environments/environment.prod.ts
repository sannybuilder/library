import { Config } from '../app/config';

export const environment: Config = {
  production: true,

  features: {
    editing: false,
  },
  endpoints: {
    commands: 'data/gta3.json',
  },
};

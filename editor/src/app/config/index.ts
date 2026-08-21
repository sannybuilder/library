import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';

export const CONFIG = new InjectionToken<Config>('config');

export interface Config {
  production: boolean;
  cookieDomain: string;
  features: {
    shouldBeAuthorizedToEdit: boolean;
    analytics: boolean;
    shouldDisplaySearchHelpOnInitialLoad: boolean;
  };
  endpoints: {
    base: string;
    oauth: string;
    user: string;
    contents: string;
    tree: string;
  };
  // Base URL template for SCM data (map.json + all script files).
  // Supports {game} and {version} placeholders, e.g.
  //   local:  /assets/{game}/scm/{version}
  //   remote: https://sannybuilder.com/decfiles/{game}_{version}
  scmBase: string;
}

@NgModule({
  providers: [
    {
      provide: CONFIG,
      useValue: environment,
    },
  ],
})
export class ConfigModule {}

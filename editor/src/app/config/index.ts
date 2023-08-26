import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';

export const CONFIG = new InjectionToken('config');

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
  };
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

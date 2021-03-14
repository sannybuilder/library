import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { Game } from '../models';

export const CONFIG = new InjectionToken('config');

export interface Config {
  production: boolean;
  features: {
    shouldBeAuthorizedToEdit: boolean;
  };
  endpoints: {
    snippets: Record<Game, string>;
    extensions: Record<Game, string>;
    oauth: string;
    user: string;
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

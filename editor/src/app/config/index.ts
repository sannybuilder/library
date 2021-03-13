import { InjectionToken, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';

export const CONFIG = new InjectionToken('config');

export interface Config {
  production: boolean;
  features: {
    editing: boolean;
  };
  endpoints: {};
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

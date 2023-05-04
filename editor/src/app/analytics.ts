import { Injectable, Inject } from '@angular/core';
import { CONFIG, Config } from './config';

declare var gtag: (...args: unknown[]) => {};

@Injectable({
  providedIn: 'root',
})
export class AnalyticService {
  constructor(@Inject(CONFIG) private _config: Config) {}

  trackEvent(eventName: string, data: object) {
    this.send('event', eventName, data);
  }

  private send(...args: unknown[]) {
    if (this._config.features.analytics) {
      gtag && gtag(...args);
    } else {
      console.log(...args);
    }
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Game, Platform, Version } from '../../models';
import { selectPlatforms, selectVersions } from './actions';
import * as selector from './selectors';

@Injectable({ providedIn: 'root' })
export class VersionFacade {
  constructor(private store$: Store) {}

  getPlatformCheckedState(platform: Platform) {
    return this.store$.select(selector.isPlatformSelected, {
      platform,
    });
  }

  selectPlatforms(game: Game, platforms: Platform[], state: boolean) {
    this.store$.dispatch(selectPlatforms({ game, platforms, state }));
  }

  getVersionCheckedState(version: Version) {
    return this.store$.select(selector.isVersionSelected, {
      version,
    });
  }

  selectVersions(game: Game, versions: Version[], state: boolean) {
    this.store$.dispatch(selectVersions({ game, versions, state }));
  }
}

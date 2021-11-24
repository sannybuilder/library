import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { flatten, orderBy, uniqBy } from 'lodash';
import { of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import {
  Attribute,
  CommandAttributes,
  Game,
  GamePlatforms,
  GameVersions,
  Modifier,
  Platform,
  Version,
} from '../../../models';
import { ExtensionsFacade, UiFacade } from '../../../state';

@Component({
  selector: 'scl-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent {
  private _game: Game;

  @Input() set game(val: Game) {
    this.platforms = GamePlatforms[val];
    this.versions = GameVersions[val];
    this._game = val;
  }

  get game() {
    return this._game;
  }
  extensionNames$ = this._extensions.extensionNames$;
  selectedExtensionEntities$ = this._ui.selectedExtensions$.pipe(
    switchMap((extensions) => {
      return extensions?.length
        ? zip(...extensions.map((e) => this.getExtensionEntities(e)))
        : of([]);
    }),
    map((entities) =>
      uniqBy(orderBy(flatten(entities), ['type', 'name']), 'name')
    )
  );

  attributes = CommandAttributes;
  platforms: Platform[] = [];
  versions: Version[] = [];
  Platform = Platform;
  Version = Version;

  constructor(private _extensions: ExtensionsFacade, private _ui: UiFacade) {}

  selectExtension(extension: string, state: boolean) {
    this._ui.selectExtensions(this.game, [extension], state);
  }

  isExtensionChecked(extension: string) {
    return this._ui.getExtensionCheckedState(extension);
  }

  toggleAttribute(attribute: Attribute, modifier: Modifier) {
    this._ui.toggleAttribute(attribute, modifier);
  }

  isAttributeChecked(attribute: Attribute, modifier: Modifier) {
    return this._ui.getAttributeCheckedState(attribute, modifier);
  }

  getExtensionEntities(extension: string) {
    return this._extensions.getExtensionEntities(extension);
  }

  isClassChecked(className: string | 'any' | 'none') {
    return this._ui.getClassCheckedState(className);
  }

  selectClass(className: string | 'any' | 'none', state: boolean) {
    return this._ui.selectClass(this.game, className, state);
  }

  selectPlatform(platform: Platform, event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    target.checked = false;
    this._ui.selectPlatforms(this.game, [platform], checked);
  }

  isPlatformChecked(platform: Platform) {
    return this._ui.getPlatformCheckedState(platform);
  }

  selectVersion(version: Version, event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    target.checked = false;
    this._ui.selectVersions(this.game, [version], checked);
  }

  isVersionChecked(version: Version) {
    return this._ui.getVersionCheckedState(version);
  }
}

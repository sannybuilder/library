import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { flatten, orderBy, uniqBy } from 'lodash';
import { of, zip } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { VersionFacade } from 'src/app/state/version/facade';

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
    withLatestFrom(this.extensionNames$),
    switchMap(([selectedExtensions, extensionNames]) => {
      const extensions = selectedExtensions?.includes('any')
        ? extensionNames
        : selectedExtensions;
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

  constructor(
    private _extensions: ExtensionsFacade,
    private _ui: UiFacade,
    private _version: VersionFacade
  ) {}

  selectExtension(
    extension: string,
    extensionNames: string[],
    event: MouseEvent
  ) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    target.checked = false;
    this._ui.selectExtensions(this.game, [extension], checked, extensionNames);
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
    this._version.selectPlatforms(this.game, [platform], checked);
  }

  isPlatformChecked(platform: Platform) {
    return this._version.getPlatformCheckedState(platform);
  }

  selectVersion(version: Version, event: MouseEvent) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    target.checked = false;
    this._version.selectVersions(this.game, [version], checked);
  }

  isVersionChecked(version: Version) {
    return this._version.getVersionCheckedState(version);
  }
}

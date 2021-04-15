import { Component, Input } from '@angular/core';
import { Attribute, CommandAttributes, Game, Modifier } from '../../models';
import { ExtensionsFacade, UiFacade } from '../../state';

@Component({
  selector: 'scl-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  @Input() game: Game;
  extensionNames$ = this._extensions.extensionNames$;
  selectedExtensions$ = this._ui.selectedExtensions$;

  filters = CommandAttributes;

  constructor(private _extensions: ExtensionsFacade, private _ui: UiFacade) {}

  selectExtension(extension: string, state: boolean) {
    this._ui.selectExtension(this.game, extension, state);
  }

  isExtensionChecked(extension: string) {
    return this._ui.getExtensionCheckedState(extension);
  }

  toggleFilter(filter: Attribute, modifier: Modifier) {
    this._ui.toggleFilter(filter, modifier);
  }

  isFilterChecked(filter: Attribute, modifier: Modifier) {
    return this._ui.getFilterCheckedState(filter, modifier);
  }

  getExtensionEntities(extension: string) {
    return this._extensions.getExtensionEntities(extension);
  }

  isClassChecked(className: string, extension: string) {}

  selectClass(className: string, extension: string, state: boolean) {}
}

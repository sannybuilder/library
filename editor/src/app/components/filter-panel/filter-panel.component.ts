import { Component, Input } from '@angular/core';
import { CommandAttributes, Game, Modifier } from '../../models';
import { ExtensionsFacade, UiFacade } from '../../state';

@Component({
  selector: 'scl-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  @Input() game: Game;
  extensionNames$ = this._extensions.extensionNames$;

  filters = CommandAttributes;

  constructor(private _extensions: ExtensionsFacade, private _ui: UiFacade) {}

  toggleExtension(extension: string) {
    this._extensions.toggleExtension(this.game, extension);
  }

  isExtensionChecked(extension: string) {
    return this._extensions.getExtensionCheckedState(extension);
  }

  toggleFilter(filter: string, modifier: Modifier) {
    this._ui.toggleFilter(filter, modifier);
  }

  isFilterChecked(filter: string, modifier: Modifier) {
    return this._ui.getFilterCheckedState(filter, modifier);
  }
}

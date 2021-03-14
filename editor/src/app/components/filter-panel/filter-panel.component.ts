import { Component } from '@angular/core';
import { CommandAttributes, Modifier } from '../../models';
import { ExtensionsFacade } from '../../state/extensions/facade';

@Component({
  selector: 'scl-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  extensionNames$ = this._extensions.extensionNames$;

  filters = CommandAttributes;

  constructor(private _extensions: ExtensionsFacade) {}

  toggleExtension(extenstion: string) {
    this._extensions.toggleExtension(extenstion);
  }

  isExtensionChecked(extension: string) {
    return this._extensions.getExtensionCheckedState(extension);
  }

  toggleFilter(filter: string, modifier: Modifier) {
    this._extensions.toggleFilter(filter, modifier);
  }

  isFilterChecked(filter: string, modifier: Modifier) {
    return this._extensions.getFilterCheckedState(filter, modifier);
  }
}

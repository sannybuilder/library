import { Component } from '@angular/core';
import { CommandAttributes, Modifier } from '../../models';
import { StateFacade } from 'src/app/state/facade';

@Component({
  selector: 'scl-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  extensionNames$ = this._facade.extensionNames$;

  filters = CommandAttributes;

  constructor(private _facade: StateFacade) {}

  toggleExtension(extenstion: string) {
    this._facade.toggleExtension(extenstion);
  }

  isExtensionChecked(extension: string) {
    return this._facade.getExtensionCheckedState(extension);
  }

  toggleFilter(filter: string, modifier: Modifier) {
    this._facade.toggleFilter(filter, modifier);
  }

  isFilterChecked(filter: string, modifier: Modifier) {
    return this._facade.getFilterCheckedState(filter, modifier);
  }
}

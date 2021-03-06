import { Component } from '@angular/core';
import { CommandAttributes } from '../../models';
import { StateFacade } from 'src/app/state/facade';

@Component({
  selector: 'scl-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  extensions$ = this._facade.extensions$;
  extensionNames$ = this._facade.extensionNames$;

  filters = CommandAttributes;

  constructor(private _facade: StateFacade) {}

  toggleExtension(extenstion: string) {
    this._facade.toggleExtension(extenstion);
  }

  isExtensionChecked(extension: string) {
    return this._facade.getExtensionCheckedState(extension);
  }

  toggleFilter(filter: string) {
    this._facade.toggleFilter(filter);
  }

  isFilterChecked(filter: string) {
    return this._facade.getFilterCheckedState(filter);
  }
}

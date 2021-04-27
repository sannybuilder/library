import { Component } from '@angular/core';
import { UiFacade, ChangesFacade, ExtensionsFacade } from '../../../state';

@Component({
  selector: 'scl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  lastUpdate$ = this._extensions.lastUpdate$;
  displayLastUpdate$ = this._ui.displayLastUpdated$;
  changesCount$ = this._changes.changesCount$;
  isUpdating$ = this._changes.isUpdating$;

  constructor(
    private _changes: ChangesFacade,
    private _ui: UiFacade,
    private _extensions: ExtensionsFacade
  ) {}

  submitChanges() {
    this._changes.submitChanges();
  }
}

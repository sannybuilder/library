import { Component } from '@angular/core';
import { ExtensionsFacade, UiFacade } from '../../state';

@Component({
  selector: 'scl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  lastUpdate$ = this._extensions.lastUpdate$;
  displayLastUpdate$ = this._ui.displayLastUpdated$;
  changesCount$ = this._ui.changesCount$;

  constructor(private _extensions: ExtensionsFacade, private _ui: UiFacade) {}

  submitChanges() {
    this._extensions.submitChanges();
  }
}

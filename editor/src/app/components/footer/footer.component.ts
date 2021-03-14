import { Component } from '@angular/core';
import { ExtensionsFacade } from '../../state/extensions/facade';

@Component({
  selector: 'scl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  lastUpdate$ = this._extensions.lastUpdate$;
  displayLastUpdate$ = this._extensions.displayLastUpdated$;
  changesCount$ = this._extensions.changesCount$;

  constructor(private _extensions: ExtensionsFacade) {}

  submitChanges() {
    this._extensions.submitChanges();
  }
}

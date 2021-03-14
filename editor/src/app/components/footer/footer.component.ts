import { Component } from '@angular/core';
import { ExtensionsFacade } from '../../state/extensions/facade';

@Component({
  selector: 'scl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  lastUpdate$ = this._facade.lastUpdate$;
  displayLastUpdate$ = this._facade.displayLastUpdated$;
  changesCount$ = this._facade.changesCount$;

  constructor(private _facade: ExtensionsFacade) {}

  submitChanges() {
    this._facade.submitChanges();
  }
}

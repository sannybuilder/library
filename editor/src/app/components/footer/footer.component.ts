import { Component } from '@angular/core';
import { UiFacade, ChangesFacade } from '../../state';

@Component({
  selector: 'scl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  lastUpdate$ = this._changes.lastUpdate$;
  displayLastUpdate$ = this._ui.displayLastUpdated$;
  changesCount$ = this._changes.changesCount$;

  constructor(private _changes: ChangesFacade, private _ui: UiFacade) {}

  submitChanges() {
    this._changes.submitChanges();
  }
}

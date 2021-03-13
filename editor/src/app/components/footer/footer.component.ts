import { Component } from '@angular/core';
import { StateFacade } from 'src/app/state/facade';

@Component({
  selector: 'scl-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  lastUpdate$ = this._facade.lastUpdate$;
  displayLastUpdate$ = this._facade.displayLastUpdated$;
  changesCount$ = this._facade.changesCount$;

  constructor(private _facade: StateFacade) {}

  submitChanges() {
    this._facade.submitChanges();
  }
}

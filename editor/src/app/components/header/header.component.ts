import { Component } from '@angular/core';
import { StateFacade } from 'src/app/state/facade';

@Component({
  selector: 'scl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  searchTerm: string = '';
  displaySearchBar$ = this._facade.displaySearchBar$;

  constructor(private _facade: StateFacade) {}

  onSearchUpdate(term: string) {
    this._facade.updateSearch(term);
  }

  clear() {
    this.searchTerm = '';
    this.onSearchUpdate('');
  }
}

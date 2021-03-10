import { Component } from '@angular/core';
import { AuthFacade } from '../../auth/auth.facade';
import { Game } from '../../models';
import { StateFacade } from '../../state/facade';

@Component({
  selector: 'scl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  Game = Game;
  searchTerm: string = '';
  displaySearchBar$ = this._facade.displaySearchBar$;
  isAuthorized$ = this._authFacade.isAuthorized$;
  avatarUrl$ = this._authFacade.avatarUrl$;
  userName$ = this._authFacade.userName$;

  constructor(private _facade: StateFacade, private _authFacade: AuthFacade) {}

  onSearchUpdate(term: string) {
    this._facade.updateSearch(term);
  }

  clear() {
    this.searchTerm = '';
    this.onSearchUpdate('');
  }

  login() {
    this._authFacade.login();
  }

  logout() {
    this._authFacade.logout();
  }
}

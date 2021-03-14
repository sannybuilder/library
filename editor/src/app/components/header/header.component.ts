import { Component } from '@angular/core';
import { AuthFacade } from '../../state/auth/auth.facade';
import { Game } from '../../models';
import { ExtensionsFacade } from '../../state/extensions/facade';

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

  constructor(
    private _facade: ExtensionsFacade,
    private _authFacade: AuthFacade
  ) {}

  onSearchUpdate(term: string) {
    this._facade.updateSearch(term);
  }

  clear() {
    this.searchTerm = '';
    this.onSearchUpdate('');
  }

  login() {
    this._authFacade.login();
    return false;
  }

  logout() {
    this._authFacade.logout();
    return false;
  }
}

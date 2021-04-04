import { Component } from '@angular/core';
import { Game } from '../../models';
import { UiFacade, AuthFacade } from '../../state';

@Component({
  selector: 'scl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  Game = Game;
  searchTerm = '';
  displaySearchBar$ = this._ui.displaySearchBar$;
  isAuthorized$ = this._auth.isAuthorized$;
  avatarUrl$ = this._auth.avatarUrl$;
  userName$ = this._auth.userName$;

  constructor(private _auth: AuthFacade, private _ui: UiFacade) {}

  onSearchUpdate(term: string) {
    this._ui.updateSearch(term);
  }

  clear() {
    this.searchTerm = '';
    this.onSearchUpdate('');
  }

  login() {
    this._auth.login();
    return false;
  }

  logout() {
    this._auth.logout();
    return false;
  }
}

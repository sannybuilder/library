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
  displaySearchBar$ = this._extensions.displaySearchBar$;
  isAuthorized$ = this._auth.isAuthorized$;
  avatarUrl$ = this._auth.avatarUrl$;
  userName$ = this._auth.userName$;

  constructor(
    private _extensions: ExtensionsFacade,
    private _auth: AuthFacade
  ) {}

  onSearchUpdate(term: string) {
    this._extensions.updateSearch(term);
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

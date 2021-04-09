import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Game } from '../../models';
import { UiFacade, AuthFacade } from '../../state';

@Component({
  selector: 'scl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  Game = Game;
  displaySearchBar$ = this._ui.displaySearchBar$;
  isAuthorized$ = this._auth.isAuthorized$;
  avatarUrl$ = this._auth.avatarUrl$;
  userName$ = this._auth.userName$;
  searchTerm$ = this._ui.searchTerm$;
  searchDebounced$ = new Subject<string>();

  constructor(private _auth: AuthFacade, private _ui: UiFacade) {}

  ngOnInit() {
    this.searchDebounced$.pipe(debounceTime(300)).subscribe((value) => {
      this._ui.updateSearch(value);
    });
  }

  ngOnDestroy() {
    this.searchDebounced$.complete();
  }

  onSearchUpdate(term: string) {
    this.searchDebounced$.next(term);
  }

  clear() {
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

  scrollTop() {
    this._ui.scrollTop();
    return false;
  }
}

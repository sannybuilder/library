import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
} from 'rxjs/operators';
import {
  GameEditions,
  getBaseGame,
  getBaseGames,
  getGameVariations,
  isValidGame,
} from '../../../utils';
import { Config, CONFIG } from '../../../config';
import { KNOWN_LANGUAGES } from '../../../models';
import { UiFacade, AuthFacade, GameFacade } from '../../../state';

@Component({
  selector: 'scl-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  baseGames = getBaseGames();
  KNOWN_LANGUAGES = KNOWN_LANGUAGES;
  displaySearchHelp$ = this._ui.displaySearchHelp$;
  isSearchHelpDismissed$ = this._ui.isSearchHelpDismissed$;
  game$ = this._game.game$;

  displaySearchBar$ = this._ui.displaySearchBar$;
  isAuthorized$ = this._auth.isAuthorized$;
  avatarUrl$ = this._auth.avatarUrl$;
  userName$ = this._auth.userName$;
  profileUrl$ = this._auth.profileUrl$;
  searchTerm$ = this._ui.searchTerm$;
  searchDebounced$ = new Subject<string>();

  activeRoute$ = this._router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => {
      const parts = event.url.split(/[\/?]/);
      const maybeGame = parts[1];
      return isValidGame(maybeGame) ? getBaseGame(maybeGame) : maybeGame;
    })
  );

  constructor(
    private _auth: AuthFacade,
    private _ui: UiFacade,
    private _router: Router,
    private _translate: TranslateService,
    private _cookies: CookieService,
    private _game: GameFacade,
    @Inject(CONFIG) private _config: Config
  ) {}

  ngOnInit() {
    this.searchDebounced$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
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

  toggleLanguage(lang: string) {
    if (KNOWN_LANGUAGES.includes(lang)) {
      this._translate.use(lang);
      this._cookies.set('sblang', lang, 30, '/', this._config.cookieDomain);
    }
    return false;
  }

  toggleSearchHelp(shouldDisplay: boolean) {
    if (this._config.features.shouldDisplaySearchHelpOnInitialLoad) {
      this._ui.toggleSearchHelp({ shouldDisplay });
    }
  }

  dismissSearchHelp() {
    this._ui.dismissSearchHelp();
  }

  forceSearchHelp() {
    this._ui.toggleSearchHelp({ force: true });
  }

  getGameVariations(game: keyof typeof GameEditions) {
    return getGameVariations(game);
  }
}

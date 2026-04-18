import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import {
  doesGameHaveMap,
  doesGameHaveNativeDocs,
  doesGameHaveScm,
  getBaseGame,
  getBaseGames,
  getGameVariations,
  isValidGame,
} from '../../../utils';
import { Config, CONFIG } from '../../../config';
import { Game, KNOWN_LANGUAGES } from '../../../models';
import { UiFacade, AuthFacade, GameFacade } from '../../../state';
import { install, uninstall } from '@github/hotkey';
import { AnalyticsService } from '../../../analytics';

@Component({
    selector: 'scl-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _auth = inject(AuthFacade);
  private _ui = inject(UiFacade)
  private _router = inject(Router);
  private _translate = inject(TranslateService)
  private _cookies = inject(CookieService);
  private _game = inject(GameFacade)
  private _analytics = inject(AnalyticsService);
  private _config = inject(CONFIG);

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

  ngOnInit() {
    this.searchDebounced$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        withLatestFrom(this.game$)
      )
      .subscribe(([value, game]) => {
        this._analytics.trackEvent('search', { search_term: value, game });
        this._ui.updateSearch(value);
      });

    const sb = document.querySelector('#search-bar-input');
    if (sb) {
      install(sb as HTMLElement);
    }
  }

  ngOnDestroy() {
    this.searchDebounced$.complete();
    const sb = document.querySelector('#search-bar-input');
    if (sb) {
      uninstall(sb as HTMLElement);
    }
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

  getGameVariations(game: Game) {
    return getGameVariations(game);
  }

  doesGameHaveNativeDocs(game: Game) {
    return doesGameHaveNativeDocs(game);
  }

  doesGameHaveMap(game: Game) {
    return doesGameHaveMap(game);
  }
  
  doesGameHaveScm(game: Game) {
    return doesGameHaveScm(game);
  }
}

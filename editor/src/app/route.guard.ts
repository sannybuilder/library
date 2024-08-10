import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import {
  DEFAULT_EXTENSION,
  ViewContext,
  Game,
  GameTitle,
  Platform,
  Version,
} from './models';
import { AuthFacade, GameFacade } from './state';
import { decodePlatforms, decodeVersions, isValidGame } from './utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private _auth: AuthFacade, private location: Location) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { access_token } = route.queryParams;
    if (access_token) {
      this.location.replaceState('/');
    }
    this._auth.onAppEnter(access_token);
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class RouteGuard {
  constructor(
    private _router: Router,
    private _game: GameFacade,
    private _title: Title
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { segments, searchTerm } = getSegmentsFromUrl(
      this._router,
      state.url
    );
    if (segments.length === 0) {
      return this.goHome();
    }

    const game = segments.shift();
    if (!isValidGame(game)) {
      return this.goHome();
    }
    this._title.setTitle(`Sanny Builder Library :: ${GameTitle[game]}`);

    const context = segments.shift();
    if (!context || !['script', 'native'].includes(context)) {
      // redirect old /game/<...> under new /game/script route
      return this._router.navigate(
        ['/', game, 'script', context, ...segments].filter(Boolean),
        { queryParams: route.queryParams }
      );
    }

    const scope = segments.shift();

    if (scope) {
      if (
        ![
          'extensions',
          'versions',
          'find',
          'generate',
          'classes',
          'enums',
        ].includes(scope)
      ) {
        // /:game/:extensionName/ -> /:game/script/extensions/:extensionName/
        return this._router.navigate(
          ['/', game, 'script', 'extensions', scope, ...segments].filter(
            Boolean
          ),
          { queryParams: route.queryParams }
        );
      }

      if (scope === 'extensions' && context !== 'script') {
        return this.goHome();
      }
      if (scope === 'versions' && context !== 'native') {
        return this.goHome();
      }
    }

    let scopeName, itemName, action;
    function assertAction(name: string | undefined) {
      if (name && ['new', 'edit'].includes(name)) {
        action = name;
        return segments.length > 0;
      }
      return false;
    }

    scopeName = segments.shift();

    if (assertAction(scopeName)) {
      return this.goHome();
    }

    itemName = segments.shift();
    if (assertAction(itemName)) {
      return this.goHome();
    }

    if (!action) {
      action = segments.shift();
      if (assertAction(action)) {
        return this.goHome();
      }
    }

    const viewContext =
      context === 'native' ? ViewContext.Code : ViewContext.Script;

    if (scope === 'classes') {
      const className = scopeName || 'all';

      this._game.onListEnter({
        game,
        className,
        extension: DEFAULT_EXTENSION,
        action,
        viewContext,
      });
      return true;
    }

    if (scope === 'enums') {
      const enumName = scopeName || 'all';
      this._game.onListEnter({
        game,
        enumName,
        extension: DEFAULT_EXTENSION,
        action,
        viewContext,
      });
      return true;
    }

    if (scope === 'find') {
      this._game.onListEnter({
        game,
        extension: DEFAULT_EXTENSION,
        action: 'decision-tree',
      });
      return true;
    }

    if (scope === 'generate') {
      const params = scopeName;
      if (params) {
        const [fileName, ...selectedExtensions] = params.split(',');
        this._game.onListEnter({
          game,
          extension: DEFAULT_EXTENSION,
          action: 'generate-json',
          generateJsonModel: { fileName, selectedExtensions },
        });
        return true;
      } else {
        this._game.onListEnter({
          game,
          extension: DEFAULT_EXTENSION,
          action: 'generate-json',
        });
        return true;
      }
    }

    if (scope && !scopeName) {
      this._game.onListEnter({
        game,
        extension: 'all',
        viewContext,
      });
      return true;
    }

    // extensions
    const id = itemName;
    const extension = scopeName;

    const platforms = getPlatformsFromUrl(this._router, state.url, game);
    const versions = getVersionsFromUrl(this._router, state.url, game);

    this._game.onListEnter({
      game,
      extension,
      id,
      action,
      searchTerm,
      platforms,
      versions,
      viewContext,
    });

    return true;
  }

  goHome() {
    return this._router.parseUrl('/');
  }
}

function getSegmentsFromUrl(
  router: Router,
  url: string
): {
  segments: string[];
  searchTerm?: string;
} {
  const tree = router.parseUrl(url);
  return {
    searchTerm: tree.queryParams?.q,
    segments:
      tree.root?.children?.primary?.segments.map((segment) => segment.path) ??
      [],
  };
}

function getPlatformsFromUrl(
  router: Router,
  url: string,
  game: Game
): Platform[] {
  const tree = router.parseUrl(url);
  return decodePlatforms(tree.queryParams?.p, game);
}

function getVersionsFromUrl(
  router: Router,
  url: string,
  game: Game
): Version[] {
  const tree = router.parseUrl(url);
  return decodeVersions(tree.queryParams?.v, game);
}

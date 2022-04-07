import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import {
  DEFAULT_EXTENSION,
  Game,
  GameTitle,
  Platform,
  Version,
} from './models';
import { AuthFacade, GameFacade } from './state';
import { decodePlatforms, decodeVersions, isValidGame } from './utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
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
export class RouteGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _game: GameFacade,
    private _title: Title
  ) {}

  canActivate(_next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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

    const subPath = segments.shift();
    if (subPath === 'classes') {
      const className = segments.shift() || 'all';

      this._game.onListEnter({
        game,
        className,
        extension: DEFAULT_EXTENSION,
        action: segments.shift(),
      });
      return true;
    }

    if (subPath === 'enums') {
      const enumName = segments.shift() || 'all';
      this._game.onListEnter({
        game,
        enumName,
        extension: DEFAULT_EXTENSION,
        action: segments.shift(),
      });
      return true;
    }

    if (subPath === 'find') {
      this._game.onListEnter({
        game,
        extension: DEFAULT_EXTENSION,
        action: 'decision-tree',
      });
      return true;
    }

    if (subPath === 'generate') {
      const params = segments.shift();
      if (params) {
        const [fileName, ...selectedExtensions] = params.split(',');
        this._game.onListEnter({
          game,
          extension: DEFAULT_EXTENSION,
          action: 'generate-json',
          generateJsonModel: { fileName, selectedExtensions },
        });
        return true;
      }
    }

    // extensions
    const opcode = segments.shift();
    const extension = subPath;

    const platforms = getPlatformsFromUrl(this._router, state.url, game);
    const versions = getVersionsFromUrl(this._router, state.url, game);

    this._game.onListEnter({
      game,
      extension,
      opcode,
      action: segments.shift(),
      searchTerm,
      platforms,
      versions,
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

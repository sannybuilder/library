import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { DEFAULT_EXTENSION, Game } from './models';
import { AuthFacade, GameFacade, UiFacade } from './state';

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
    private _ui: UiFacade
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._ui.canEdit$.pipe(
      map((canEdit) => {
        const segments = getSegmentsFromUrl(this._router, state.url);

        if (segments.length === 0) {
          return this.goHome();
        }

        const game = getGame(segments.shift());

        if (!game) {
          return this.goHome();
        }

        const subPath = segments.shift();
        if (subPath === 'classes') {
          const className = segments.shift();

          this._game.onListEnter({
            game,
            className,
            extension: DEFAULT_EXTENSION,
          });
        } else if (subPath === 'enums') {
          const enumName = segments.shift();

          // editing by anonymous user is not allowed
          if (enumName?.toLowerCase() === 'new' && !canEdit) {
            return this.goGame(game);
          }
          this._game.onListEnter({
            game,
            enumName,
            extension: DEFAULT_EXTENSION,
          });
        } else {
          const extension = subPath || DEFAULT_EXTENSION;
          const opcode = segments.shift();
          this._game.onListEnter({
            game,
            extension,
            opcode,
          });
        }

        return true;
      })
    );
  }

  goHome() {
    return this._router.parseUrl('/');
  }

  goGame(game: string) {
    return this._router.parseUrl('/' + game);
  }
}

function getSegmentsFromUrl(router: Router, url: string): string[] {
  const tree = router.parseUrl(url);
  return (
    tree.root?.children?.primary?.segments.map((segment) => segment.path) ?? []
  );
}

function getGame(game: string): Game {
  if (game === 'gta3') {
    return Game.GTA3;
  }
  if (game === 'vc') {
    return Game.VC;
  }
  if (game === 'sa') {
    return Game.SA;
  }
}

import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { DEFAULT_EXTENSION, Game } from './models';
import { AuthFacade } from './state/auth/facade';
import { ExtensionsFacade } from './state/extensions/facade';
import { UiFacade } from './state/ui/facade';

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
  constructor(private _router: Router, private _ui: UiFacade) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const segments = getSegmentsFromUrl(this._router, state.url);

    if (segments.length === 0) {
      return this.goHome();
    }

    const game = getGame(segments.shift());

    if (game) {
      const extension = segments.shift() || DEFAULT_EXTENSION;
      const opcode = segments.shift();

      this._ui.onListEnter(game, opcode, extension);
      return true;
    }

    return this.goHome();
  }

  goHome() {
    return this._router.parseUrl('/');
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

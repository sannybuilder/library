import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Resolve,
} from '@angular/router';
import { DEFAULT_EXTENSION, Game } from './models';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const segments = getSegmentsFromUrl(this._router, state.url);

    if (segments.length === 0) {
      return this.goHome();
    }

    const game = segments[0];

    if (['gta3', 'vc'].includes(game)) {
      return true;
    }

    return this.goHome();
  }

  goHome() {
    return this._router.parseUrl('/');
  }
}

interface RouteData {
  game: Game;
  extension: string;
  opcode?: string;
  title: string;
}

@Injectable()
export class RouteResolver implements Resolve<RouteData> {
  constructor(private _router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): RouteData {
    const segments = getSegmentsFromUrl(this._router, state.url);

    const game = getGame(segments.shift());
    const defaultData = {
      game,
      title: getGameTitle(game),
      extension: DEFAULT_EXTENSION,
    };

    if (segments.length === 2) {
      return {
        ...defaultData,
        extension: segments.shift(),
        opcode: segments.shift(),
      };
    }
    if (segments.length === 1) {
      return {
        ...defaultData,
        opcode: segments.shift(),
      };
    }
    return defaultData;
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
}

function getGameTitle(game: Game): string {
  if (game === Game.GTA3) {
    return 'GTA III';
  }
  if (game === Game.VC) {
    return 'Vice City';
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { enter, authorize, authorizeFail } from './actions';
import {
  authTokenSelector,
  avatarUrlSelector,
  isAuthorizedSelector,
  userNameSelector,
} from './selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  userName$ = this.store$.select(userNameSelector);
  isAuthorized$ = this.store$.select(isAuthorizedSelector);
  avatarUrl$ = this.store$.select(avatarUrlSelector);
  authToken$ = this.store$.select(authTokenSelector);

  constructor(private store$: Store) {}

  login() {
    this.store$.dispatch(authorize());
  }

  logout() {
    this.store$.dispatch(authorizeFail());
  }

  onAppEnter(accessToken?: string) {
    this.store$.dispatch(enter({ accessToken }));
  }
}

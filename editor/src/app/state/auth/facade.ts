import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { enter, authorize, authorizeFail } from './actions';
import {
  avatarUrlSelector,
  isAuthorizedSelector,
  userNameSelector,
} from './selectors';

@Injectable()
export class AuthFacade {
  userName$ = this.store$.select(userNameSelector);
  isAuthorized$ = this.store$.select(isAuthorizedSelector);
  avatarUrl$ = this.store$.select(avatarUrlSelector);

  constructor(private store$: Store) {}

  login() {
    this.store$.dispatch(authorize());
  }

  logout() {
    this.store$.dispatch(authorizeFail());
  }

  onAppEnter(access_token?: string) {
    this.store$.dispatch(enter({ access_token }));
  }
}

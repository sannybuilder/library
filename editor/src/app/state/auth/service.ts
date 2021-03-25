import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { CONFIG, Config } from '../../config';

interface UserResponse {
  login: string;
  avatar_url: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly sessionKey = 'sbl.oauth.access_token';
  private readonly clientId = 'c07f7913dd4515732ac7';

  constructor(
    private _http: HttpClient,
    private cookieService: CookieService,
    @Inject(CONFIG) public config: Config
  ) {}

  login(state: string) {
    const params = {
      state,
      client_id: this.clientId,
      scope: 'public_repo',
    };
    const query = Object.entries(params)
      .map((v) => v.join('='))
      .join('&');
    window.location.href = [this.config.endpoints.oauth, query].join('?');
  }

  setSession(accessToken: string) {
    this.cookieService.set(this.sessionKey, accessToken, 2);
  }

  getSession(): string {
    return this.cookieService.get(this.sessionKey);
  }

  removeSession(): void {
    this.cookieService.delete(this.sessionKey);
  }

  getUser(token: string): Observable<UserResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this._http.get<UserResponse>(this.config.endpoints.user, {
      headers,
    });
  }
}

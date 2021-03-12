import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { CONFIG, Config } from '../config';
import { createGitHubAdaptor, createKoreFile, KoreFile } from '../korefile';

interface UserResponse {
  login: string;
  avatar_url: string;
}
@Injectable()
export class AuthService {
  private readonly sessionKey = 'sbl.oauth.access_token';
  private readonly client_id = 'c07f7913dd4515732ac7';

  public github?: KoreFile; 

  constructor(
    private _http: HttpClient,
    private cookieService: CookieService,
    @Inject(CONFIG) public config: Config
  ) {}

  login(state: string) {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${this.client_id}&state=${state}&scope=public_repo`;
  }

  setSession(access_token: string) {
    this.cookieService.set(this.sessionKey, access_token, 2);

    this.github = createKoreFile({
      adaptor: createGitHubAdaptor({
        owner: 'sannybuilder',
        repo: 'library',
        ref: 'heads/master',
        token: access_token,
      })
    });
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

    return this._http.get<UserResponse>('https://api.github.com/user', {
      headers: headers,
    });
  }
}

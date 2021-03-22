import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

import { CONFIG, Config } from '../../config';
import { Links } from './reducer';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) public config: Config
  ) {}

  loadLinks(): Observable<Links> {
    return this.http.get<Links>(
      Location.joinWithSlash(this.config.endpoints.base, 'links.json')
    );
  }
}

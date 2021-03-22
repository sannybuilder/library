import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Links } from './reducer';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private http: HttpClient) {}

  loadLinks(): Observable<Links> {
    return this.http.get<Links>('/assets/links.json');
  }
}

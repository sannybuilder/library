import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, SupportInfo } from '../../models';

import { Links } from './reducer';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private http: HttpClient) {}

  loadLinks(): Observable<Links> {
    return this.http.get<Links>('/assets/links.json');
  }

  loadSupportInfo(game: Game): Observable<SupportInfo> {
    return this.http.get<SupportInfo>(`/assets/${game}/supported.json`);
  }
}

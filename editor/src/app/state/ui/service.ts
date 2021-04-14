import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, SupportInfo } from '../../models';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private http: HttpClient) {}

  loadSupportInfo(game: Game): Observable<SupportInfo> {
    const ts = Date.now().toString();
    return this.http.get<SupportInfo>(`/assets/${game}/supported.json`, {
      params: { ts },
    });
  }
}

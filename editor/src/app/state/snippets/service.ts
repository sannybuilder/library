import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { ExtensionSnippets, Game, GameSnippets } from '../../models';

@Injectable({ providedIn: 'root' })
export class SnippetsService {
  constructor(private http: HttpClient) {}

  loadSnippets(game: Game): Observable<ExtensionSnippets> {
    const ts = Date.now().toString();
    return this.http.get<ExtensionSnippets>(
      Location.joinWithSlash('/assets', GameSnippets[game]),
      { params: { ts } }
    );
  }
}

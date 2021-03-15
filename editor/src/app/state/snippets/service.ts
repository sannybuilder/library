import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { CONFIG, Config } from '../../config';
import { ExtensionSnippets, Game, GameSnippets } from '../../models';

@Injectable({ providedIn: 'root' })
export class SnippetsService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) public config: Config
  ) {}

  loadSnippets(game: Game): Observable<ExtensionSnippets> {
    return this.http.get<ExtensionSnippets>(
      Location.joinWithSlash(this.config.endpoints.base, GameSnippets[game])
    );
  }
}

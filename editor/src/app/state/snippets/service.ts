import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG, Config } from '../../config';
import { ExtensionSnippets, Game } from '../../models';

@Injectable()
export class SnippetsService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) public config: Config
  ) {}

  loadSnippets(game: Game): Observable<ExtensionSnippets> {
    return this.http.get<ExtensionSnippets>(
      this.config.endpoints.snippets[game]
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONFIG, Config } from '../config';
import { Extension } from '../models';

interface LoadCommandsResponse {
  meta: {
    last_update: number;
  };
  extensions: Extension[];
}

interface UpdateCommandsResponse {
  result: 'OK';
  last_update: number;
}

@Injectable({ providedIn: 'root' })
export class CommandsService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) public config: Config
  ) {}

  loadExtensions(): Observable<{
    extensions: Extension[];
    lastUpdate: number;
  }> {
    return this.http
      .get<LoadCommandsResponse>(this.config.endpoints.commands)
      .pipe(
        map((data) => ({
          extensions: data.extensions,
          lastUpdate: data.meta.last_update,
        }))
      );
  }

  updateExtensions(data: Extension[]): Observable<{ lastUpdate: number }> {
    return this.http
      .post<UpdateCommandsResponse>(this.config.endpoints.commands, data)
      .pipe(map(({ last_update: lastUpdate }) => ({ lastUpdate })));
  }
}

import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Game, GameEnums, Enums } from '../../models';
import { CONFIG, Config } from '../../config';

@Injectable({ providedIn: 'root' })
export class EnumsService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG) private _config: Config
  ) {}

  loadEnums(game: Game): Observable<Enums> {
    const ts = Date.now().toString();
    return this.http
      .get<Enums>(
        Location.joinWithSlash(this._config.endpoints.base, GameEnums[game]),
        {
          params: { ts },
        }
      )
      .pipe(catchError(() => of({})));
  }
}

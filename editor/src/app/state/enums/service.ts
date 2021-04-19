import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Game, GameEnums, Enums } from '../../models';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EnumsService {
  constructor(private http: HttpClient) {}

  loadEnums(game: Game): Observable<Enums> {
    const ts = Date.now().toString();
    return this.http
      .get<Enums>(Location.joinWithSlash('/assets', GameEnums[game]), {
        params: { ts },
      })
      .pipe(catchError(() => of({})));
  }
}

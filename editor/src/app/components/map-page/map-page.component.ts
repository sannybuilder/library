import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AreaData,
  BlipCategory,
  BlipData,
  RRRData,
} from '../maps/map-view/model';

export interface XYZ {
  x: number;
  y: number;
  z: number;
}

@Component({
  selector: 'scl-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  standalone: false,
})
export class MapPageComponent {
  rrr$ = this._http.get<RRRData>('/assets/sa/maps/locations/rrr.json');
  blips$: Observable<BlipCategory[]> = this._http
    .get<BlipData>('/assets/sa/maps/locations/blips.json')
    .pipe(
      map((blips) => {
        return [
          {
            id: 1,
            name: 'Collectibles',
            subcategory: [
              {
                id: 1,
                name: 'Spray Tags',
                icon: 'spray_tag.png',
                positions: blips.sprayTags,
                visible: false,
              },
              {
                id: 2,
                name: 'Oysters',
                icon: 'oyster.png',
                positions: blips.oysters,
                visible: false,
              },
              {
                id: 3,
                name: 'Photo Opportunities',
                icon: 'photo_op.png',
                positions: blips.photoOps,
                visible: false,
              },
              {
                id: 4,
                name: 'Horseshoes',
                icon: 'horseshoe.png',
                positions: blips.horseshoes,
                visible: false,
              },
            ],
          },
        ];
      })
    );
  areas$ = this._http.get<AreaData>('/assets/sa/maps/locations/areas.json');

  constructor(private _http: HttpClient) {}
}

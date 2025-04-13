import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Observable, zip } from 'rxjs';
import { AreaData, Category, BlipData, PathData } from '../maps/map-view/model';

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
  paths$: Observable<Category<PathData>[]> = zip(
    this._http.get<PathData[]>('/assets/sa/maps/locations/rrr.json')
  ).pipe(
    map(([rrr]) => {
      return [
        {
          name: 'Paths',
          subcategory: [
            {
              name: 'Pre-Recorded Paths (RRR)',
              items: rrr,
              visible: false,
            },
          ],
        },
      ];
    })
  );

  locations$: Observable<Category<XYZ>[]> = zip(
    this._http.get<BlipData>('/assets/sa/maps/locations/blips.json')
  ).pipe(
    map(([blips]) => {
      return [
        {
          name: 'Collectibles',
          subcategory: [
            {
              name: 'Spray Tags',
              icon: 'spray_tag.png',
              items: blips.sprayTags,
              visible: false,
            },
            {
              name: 'Oysters',
              icon: 'oyster.png',
              items: blips.oysters,
              visible: false,
            },
            {
              name: 'Photo Opportunities',
              icon: 'photo_op.png',
              items: blips.photoOps,
              visible: false,
            },
            {
              name: 'Horseshoes',
              icon: 'horseshoe.png',
              items: blips.horseshoes,
              visible: false,
            },
          ],
        },
      ];
    })
  );

  zones$ = zip(
    this._http.get<AreaData[]>('/assets/sa/maps/locations/areas.json'),
    this._http.get<AreaData[]>('/assets/sa/maps/locations/weather.json')
  ).pipe(
    map(([areas, weather]) => {
      return [
        {
          name: 'Zones',
          subcategory: [
            {
              name: '4-Star Areas',
              items: areas,
              visible: false,
            },
            {
              name: 'Weather Regions',
              items: weather,
              visible: false,
            },
          ],
        },
      ];
    })
  );

  constructor(private _http: HttpClient) {}
}

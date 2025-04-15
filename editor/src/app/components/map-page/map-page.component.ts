import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, shareReplay, switchMap, zip } from 'rxjs';
import {
  AreaData,
  PathData,
  MapManifest,
  MapSource,
  MarkerData,
} from '../maps/map-view/model';
import { ActivatedRoute } from '@angular/router';

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
  activeTab$ = this._route.params.pipe(map((p) => p.tab));

  manifest$ = this._http
    .get<MapManifest>('/assets/sa/maps/locations/manifest.json')
    .pipe(shareReplay());

  paths$ = this.manifest$.pipe(
    switchMap((manifest) => this.loadItems<PathData[]>(manifest.paths)),
    map((subcategory) => [
      {
        name: 'Paths',
        subcategory,
      },
    ])
  );

  zones$ = this.manifest$.pipe(
    switchMap((manifest) => this.loadItems<AreaData[]>(manifest.zones)),
    map((subcategory) => [
      {
        name: 'Zones',
        subcategory,
      },
    ])
  );

  locations$ = this.manifest$.pipe(
    switchMap((manifest) => this.loadItems<MarkerData[]>(manifest.locations)),
    map((subcategory) => [
      {
        name: 'Locations',
        subcategory,
      },
    ])
  );

  loadItems<T>(items: MapSource[]) {
    return zip(
      ...items.map((p) => {
        return this._http.get<T>(`/assets/sa/maps/locations/${p.path}`).pipe(
          map((items) => ({
            name: p.name,
            items,
            visible: false,
            icon: p.icon,
          }))
        );
      })
    );
  }

  constructor(
    private _http: HttpClient,
    private _title: Title,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.title.subscribe((title) => {
      this._title.setTitle(`Sanny Builder Library :: ${title}`);
    });
  }
}

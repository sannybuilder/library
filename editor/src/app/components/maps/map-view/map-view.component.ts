import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, MapPolygon, MapPolyline } from '@angular/google-maps';
import {
  AreaData,
  BlipCategory,
  BlipSubcategory,
  RRRData,
  GMArea,
  GMMarker,
  GMPath,
  mapIconUri,
  cdnUri,
} from './model';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { MProjection } from './classes';

@Component({
  selector: 'scl-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
  standalone: false,
})
export class MapViewComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  @Input() rrr: RRRData[] = [];
  @Input() blips: BlipCategory[] = [];
  @Input() areas: AreaData;

  mapIconUri = mapIconUri;

  isSidebarOpen = true;
  activeTab = 1;
  gmBlips: GMMarker[] = [];
  gmPaths: GMPath[] = [];
  gmAreas: GMArea[] = [];

  areWantedZonesEnabled = false;
  arePreRecordedPathsEnabled = false;
  tooltip: string;
  map: google.maps.Map;

  mapOptions = {
    backgroundColor: '#00799E',
    minZoom: 0,
    maxZoom: 7,
    isPng: false,
    mapTypeControl: true,
    streetViewControl: false,
    gestureHandling: 'greedy',
    zoom: 1,
    mapTypeControlOptions: {
      mapTypeIds: [],
    },
  };
  constructor(
    private _title: Title,
    private _translate: TranslateService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const contentKey = 'ui.map.title';
    const title = this._translate.instant(contentKey);
    this._title.setTitle(`Sanny Builder Library :: ${title}`);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMapReady(_map: any) {
    this.map = _map;
    this.map.setOptions({ center: xyToLatLng(1500, 0) });
    this.globalInit(this.map);
    this._cd.markForCheck();
  }

  globalInit(map: google.maps.Map) {
    const mapSatellite = new google.maps.ImageMapType({
      getTileUrl: function (coord: { x: number; y: number }, zoom: number) {
        const normCoord = getNormalizedCoord(coord, zoom);
        if (!normCoord) return null;
        return `${cdnUri}/satellite/map_${zoom}_${normCoord.x}_${normCoord.y}.jpg`;
      },
      tileSize: new google.maps.Size(500, 500),
      maxZoom: 7,
      name: 'Satellite',
      alt: 'GTA SA Satellite Map',
    });
    mapSatellite.projection = new MProjection();

    map.mapTypes.set('Satellite', mapSatellite);
    map.setMapTypeId('Satellite');

    // Normalizes the coords that tiles repeat across the x axis (horizontally)
    // like the standard Google map tiles.
    function getNormalizedCoord(coord: { x: number; y: number }, zoom: number) {
      const tileRanges = [0, 1, 2, 5, 11, 23, 47, 95];
      const tileRange = tileRanges[zoom];
      if (coord.y < 0 || coord.y > tileRange) return null;
      if (coord.x < 0 || coord.x > tileRange) return null;
      return { x: coord.x, y: coord.y };
    }
  }

  openInfoWindowAt(position: google.maps.LatLng, content: string) {
    this.infoWindow.position = position;
    this.infoWindow.open(
      undefined,
      true,
      `<div class="p-3 info-box">${content}</div>`
    );
  }

  openInfoWindow(marker: MapMarker) {
    if (marker.marker) {
      let pos = latLngToXY(marker.marker.getPosition()!);
      const coords = [pos.x, pos.y].join(', ');
      //   <div class="info-header-box d-flex align-items-center">
      // <img src="${icon.url}" /><h5>${data.name}</h5></div>

      const infoContent = `<div class="p-3 info-box">
      <div><strong>Position:</strong> ${coords}</div></div>`;

      const infoWindow = this.infoWindow.infoWindow;
      if (infoWindow?.isOpen) {
        infoWindow.setContent(infoContent);
        infoWindow.setPosition(marker.getPosition());
      } else {
        this.infoWindow.open(marker, true, infoContent);
      }
    }
  }

  toggleBlips(blipCategory: BlipSubcategory) {
    blipCategory.visible = !blipCategory.visible;
    this.gmBlips = this.gmBlips.filter(
      (m) => !m.id.includes(blipCategory.name)
    );
    if (!blipCategory.visible) {
      return;
    }
    this.gmBlips.push(
      ...blipCategory.positions.map(
        ({ x, y, z }: { x: number; y: number; z: number }, i) => {
          const id = blipCategory.name + ' #' + i;
          return {
            position: xyToLatLng(x, y),
            icon: {
              url: mapIconUri + blipCategory.icon,
              size: new google.maps.Size(32, 37),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(15, 35),
            },
            id,
            data: {
              x,
              y,
              z,
              name: id,
            },
          };
        }
      )
    );
  }

  toggleWantedZones() {
    this.areWantedZonesEnabled = !this.areWantedZonesEnabled;
    this.gmAreas = [];

    if (!this.areWantedZonesEnabled) {
      return;
    }

    this.gmAreas = [
      {
        id: 'LV Restricted Area',
        vertices: this.areas.lvRestrictedArea.map(([x, y]) => xyToLatLng(x, y)),
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        data: {
          toString() {
            return 'LV Restricted Area';
          },
        },
      },
      {
        id: 'SF Restricted Area',
        vertices: this.areas.sfRestrictedArea.map(([x, y]) => xyToLatLng(x, y)),
        fillColor: '#FFFF00',
        fillOpacity: 0.35,
        strokeColor: '#FFFF00',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        data: {
          toString() {
            return 'SF Restricted Area';
          },
        },
      },
    ];
  }

  togglePreRecordedPaths() {
    this.arePreRecordedPathsEnabled = !this.arePreRecordedPathsEnabled;

    this.gmPaths = this.gmPaths.filter((p) => !p.id.includes('RRR'));
    if (!this.arePreRecordedPathsEnabled) {
      return;
    }

    this.gmPaths = this.rrr.map((rrr, i) => {
      return {
        id: 'RRR #' + i,
        vertices: rrr.path.map(({ x, y }) => xyToLatLng(x, y)),
        strokeColor: '#FF0080',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        data: {
          toString() {
            return [rrr.name, rrr.description].filter(Boolean).join(': ');
          },
        },
      };
    });
  }

  onPathMouseover(_: MapPolyline, path: GMPath) {
    path.strokeColor = '#FFFF80';
    this.tooltip = `${path.data}`;
  }

  onPathMouseout(_: MapPolyline, path: GMPath) {
    path.strokeColor = '#FF0080';
    this.tooltip = `${path.data}`;
  }

  onAreaMouseover(_: MapPolygon, area: GMArea) {
    area.strokeWeight = 3;
  }

  onAreaMouseout(_: MapPolygon, area: GMArea) {
    area.strokeWeight = 1;
  }
}

function xyToLatLng(x: number, y: number) {
  return new google.maps.LatLng(y / 128, x / 128);
}

// function mapCoordsToGame(lat: number, lng: number) {
//   return { y: lat * 128, x: lng * 128 };
// }

function latLngToXY(latLng: google.maps.LatLng) {
  return { y: latLng.lat() * 128, x: latLng.lng() * 128 };
}

function stringCoordToFloat(coord: any) {
  return {
    x: parseFloat(coord.x),
    y: parseFloat(coord.y),
    z: parseFloat(coord.z),
  };
}

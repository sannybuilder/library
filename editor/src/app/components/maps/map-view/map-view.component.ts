import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import {
  MapAdvancedMarker,
  MapInfoWindow,
  MapPolygon,
  MapPolyline,
} from '@angular/google-maps';
import {
  AreaData,
  PathData,
  Category,
  Subcategory,
  GMPolygon,
  GMMarker,
  GMPolyline,
  mapIconUri,
  cdnUri,
  MarkerData,
} from './model';

import { MProjection } from './classes';

const DEFAULT_STROKE_WEIGHT = 1;

@Component({
  selector: 'scl-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
  standalone: false,
})
export class MapViewComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
  mapIconUri = mapIconUri;

  @Input() paths: Category<PathData>[] = [];
  @Input() locations: Category<MarkerData>[] = [];
  @Input() zones: Category<AreaData>[] = [];
  @Input() activeTab: string;

  gmMarkers: GMMarker[] = [];
  gmPolylines: GMPolyline[] = [];
  gmPolygons: GMPolygon[] = [];

  isSidebarOpen = true;
  tooltip: string;
  map: google.maps.Map;
  debugMarkerContent = createMarkerIcon(23, 32, 'debug.png');

  mapOptions = {
    backgroundColor: '#00799E',
    minZoom: 0,
    maxZoom: 7,
    isPng: false,
    mapTypeControl: true,
    streetViewControl: false,
    gestureHandling: 'greedy',
    zoom: 1,
    mapId: 'GTASA_MAP_ID',
    mapTypeControlOptions: {
      mapTypeIds: [],
    },
  };
  constructor(private _cd: ChangeDetectorRef) {}

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

  openInfoWindow(marker: MapAdvancedMarker, extra?: any) {
    if (!marker.advancedMarker) return;

    let markerPosition = marker.getAnchor()
      .position as google.maps.LatLngLiteral;
    let pos = latLngToXY(markerPosition);
    const coords = [pos.x, pos.y].join(', ');

    let infoContent = `<div>Position: ${coords}</div>`;

    if (extra) {
      infoContent += `<div>${extra}</div>`;
    }
    infoContent = `<div class="p-3 info-box">${infoContent}</div>`;

    this.infoWindow.infoWindow?.setPosition(markerPosition);
    this.infoWindow.open(undefined, false, infoContent);
  }

  toggleLocations(category: Subcategory<MarkerData>) {
    category.visible = !category.visible;
    this.gmMarkers = this.gmMarkers.filter(
      (m) => !m.id.includes(category.name)
    );
    if (!category.visible) {
      return;
    }
    this.gmMarkers.push(
      ...category.items.map(({ x, y, z, name }, i) => {
        const id = category.name + ' #' + i;
        return {
          position: xyToLatLng(x, y),
          content: createMarkerIcon(32, 37, category.icon!),
          id,
          data: {
            toString() {
              return name || id;
            },
          },
        };
      })
    );
  }

  toggleZones(category: Subcategory<AreaData>) {
    category.visible = !category.visible;
    this.gmPolygons = this.gmPolygons.filter(
      (m) => !m.id.includes(category.name)
    );
    if (!category.visible) {
      return;
    }

    this.gmPolygons.push(
      ...category.items.map((area, i) => {
        const id = category.name + ' #' + i;
        return {
          id,
          vertices: area.vertices.map(([x, y]) => xyToLatLng(x, y)),
          fillColor: area.color,
          fillOpacity: 0.35,
          strokeColor: area.color,
          strokeOpacity: 0.5,
          strokeWeight: DEFAULT_STROKE_WEIGHT,
          data: {
            toString() {
              return area.name;
            },
          },
        };
      })
    );
  }

  togglePaths(category: Subcategory<PathData>) {
    category.visible = !category.visible;
    this.gmPolylines = this.gmPolylines.filter(
      (m) => !m.id.includes(category.name)
    );
    if (!category.visible) {
      return;
    }

    this.gmPolylines.push(
      ...category.items.map((path, i) => {
        const id = category.name + ' #' + i;
        return {
          id,
          vertices: path.path.map(({ x, y }) => xyToLatLng(x, y)),
          strokeColor: '#FF0080',
          strokeOpacity: 1.0,
          strokeWeight: DEFAULT_STROKE_WEIGHT + 1,
          data: {
            toString() {
              return [path.name, path.description].filter(Boolean).join(': ');
            },
          },
        };
      })
    );
  }

  onPathMouseover(_: MapPolyline, path: GMPolyline) {
    path.strokeColor = '#FFFF80';
    this.tooltip = `${path.data}`;
  }

  onPathMouseout(_: MapPolyline, path: GMPolyline) {
    path.strokeColor = '#FF0080';
    this.tooltip = `${path.data}`;
  }

  onAreaMouseover(_: MapPolygon, area: GMPolygon) {
    area.strokeWeight = DEFAULT_STROKE_WEIGHT + 2;
  }

  onAreaMouseout(_: MapPolygon, area: GMPolygon) {
    area.strokeWeight = DEFAULT_STROKE_WEIGHT;
  }
}

function xyToLatLng(x: number, y: number) {
  return new google.maps.LatLng(y / 128, x / 128);
}

function latLngToXY(latLng: google.maps.LatLngLiteral) {
  return { y: latLng.lat * 128, x: latLng.lng * 128 };
}

function createMarkerIcon(width: number, height: number, icon: string) {
  const img = document.createElement('img');
  img.src = mapIconUri + icon;
  img.width = width;
  img.height = height;
  img.style.transform = 'translateY(50%)';
  return img;
}

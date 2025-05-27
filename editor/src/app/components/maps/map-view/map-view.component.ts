import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
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
const TILE_SIZE = 256.0;
const SCALE_MUL = 128.0; // tweak for game units <> lonlat
const MAP_TYPE = {
  Satellite: 'Satellite',
  Light: 'Light',
  Radar: 'Radar',
} as const;

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
  coordsTooltip: string = '';
  customTooltip: string = '';
  isCtrlPressed = false;
  map: google.maps.Map;

  mapOptions = {
    minZoom: 0,
    maxZoom: 12,
    isFractionalZoomEnabled: true,
    isPng: false,
    renderingType: "VECTOR",
    mapTypeControl: true,
    streetViewControl: false,
    gestureHandling: 'greedy',
    mapId: 'GTASA_MAP_ID',
    mapTypeControlOptions: {
      mapTypeIds: Object.keys(MAP_TYPE),
    },
  };
  constructor(private _cd: ChangeDetectorRef) {}

  @HostListener('window:keydown', ['$event'])
  changeCtrl(event: KeyboardEvent) {
    this.isCtrlPressed = event.ctrlKey;
  }

  @HostListener('window:keyup', ['$event'])
  changeCtrlUp(event: KeyboardEvent) {
    this.isCtrlPressed = event.ctrlKey;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMapReady(_map: any) {
    this.map = _map;
    this.map.setOptions({ center: xyToLatLng(1500, 0) });
    this.init(this.map);
    this._cd.markForCheck();
  }

  init(map: google.maps.Map) {
    const mapSatellite = new google.maps.ImageMapType({
      alt: 'GTA SA Satellite Map',
      name: MAP_TYPE.Satellite,
      maxZoom: 6,
      getTileUrl: function (coord: { x: number; y: number }, zoom: number) {
        const levels = 7;
        const tileRanges = new Array(levels)
          .fill(0)
          .map((_, i) => (1 << i) - 1);
        const normCoord = getNormalizedCoord(
          coord,
          tileRanges[Math.min(zoom, levels - 1)]
        );
        if (!normCoord) return null;
        return `${cdnUri}/satellite/map_${Math.min(zoom, levels - 1)}_${
          normCoord.x
        }_${normCoord.y}.webp`;
      },
      tileSize: new google.maps.Size(TILE_SIZE, TILE_SIZE),
    });
    mapSatellite.projection = new MProjection(
      TILE_SIZE * 0.5,
      (TILE_SIZE / 6000.0) * SCALE_MUL
    );

    const mapLight = new google.maps.ImageMapType({
      alt: 'GTA SA Light Map',
      name: MAP_TYPE.Light,
      maxZoom: 6,
      getTileUrl: function (coord: { x: number; y: number }, zoom: number) {
        const levels = 7;
        const tileRanges = new Array(levels)
          .fill(0)
          .map((_, i) => (1 << i) - 1);
        const normCoord = getNormalizedCoord(
          coord,
          tileRanges[Math.min(zoom, levels - 1)]
        );
        if (!normCoord) return null;
        return `${cdnUri}/light/map_${Math.min(zoom, levels - 1)}_${
          normCoord.x
        }_${normCoord.y}.webp`;
      },
      tileSize: new google.maps.Size(TILE_SIZE, TILE_SIZE),
    });
    mapLight.projection = new MProjection(
      TILE_SIZE * 0.5,
      (TILE_SIZE / 6000.0) * SCALE_MUL
    );

    const mapRadar = new google.maps.ImageMapType({
      alt: 'GTA SA Radar Map',
      name: MAP_TYPE.Radar,
      maxZoom: 6,
      getTileUrl: function (coord: { x: number; y: number }, zoom: number) {
        const levels = 7;
        const tileRanges = new Array(levels)
          .fill(0)
          .map((_, i) => (1 << i) - 1);
        const normCoord = getNormalizedCoord(
          coord,
          tileRanges[Math.min(zoom, levels - 1)]
        );
        if (!normCoord) return null;
        return `${cdnUri}/radar/map_${Math.min(zoom, levels - 1)}_${
          normCoord.x
        }_${normCoord.y}.webp`;
      },
      tileSize: new google.maps.Size(TILE_SIZE, TILE_SIZE),
    });
    mapRadar.projection = new MProjection(
      TILE_SIZE * 0.5,
      (TILE_SIZE / 6000.0) * SCALE_MUL
    );

    map.mapTypes.set(MAP_TYPE.Satellite, mapSatellite);
    map.mapTypes.set(MAP_TYPE.Light, mapLight);
    map.mapTypes.set(MAP_TYPE.Radar, mapRadar);
    map.setMapTypeId(MAP_TYPE.Satellite);

    // Normalizes the coords that tiles repeat across the x axis (horizontally)
    // like the standard Google map tiles.
    function getNormalizedCoord(
      coord: { x: number; y: number },
      tileRange: number
    ) {
      if (coord.y < 0 || coord.y > tileRange) return null;
      if (coord.x < 0 || coord.x > tileRange) return null;
      return { x: coord.x, y: coord.y };
    }
  }

  onMapMousemove(event: any) {
    const latLng = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    const pos = latLngToXY(latLng);
    this.coordsTooltip = `X: ${pos.x.toFixed(3)}, Y: ${pos.y.toFixed(3)}`;
    this.map.setOptions({
      draggableCursor: this.isCtrlPressed ? 'crosshair' : 'grab',
    });
  }

  onMapTypeChanged() {
    const id = this.map.getMapTypeId();
    const container = this.map.getDiv().children[0] as HTMLDivElement;
    switch (id) {
      case MAP_TYPE.Light: {
        container.style.backgroundColor = '#0a314b';
        break;
      }
      case MAP_TYPE.Radar: {
        container.style.backgroundColor = '#7489af';
        break;
      }
      case MAP_TYPE.Satellite: {
        container.style.backgroundColor = '#00799E';
        break;
      }
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

  highlightItem<T>(
    category: Category<T>,
    subcat: Subcategory<T>,
    item: T,
    state: boolean
  ) {
    const index = subcat.items.findIndex((i) => i === item);

    if (category.name === 'Locations') {
      if (state) {
        this.infoWindow.close();
        this.openInfoWindowAt(
          this.gmMarkers[index].position,
          `${this.gmMarkers[index].data}`
        );
      }
      if (!state) {
        this.infoWindow.close();
      }
    }
    if (category.name === 'Paths') {
      if (state) {
        this.onPathMouseover(null as any, this.gmPolylines[index]);
      }
      if (!state) {
        this.onPathMouseout(null as any, this.gmPolylines[index]);
      }
    }
    if (category.name === 'Zones') {
      if (state) {
        this.onAreaMouseover(null as any, this.gmPolygons[index]);
      }
      if (!state) {
        this.onAreaMouseout(null as any, this.gmPolygons[index]);
      }
    }
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
          strokeWeight: this.getStrokeWeight(),
          data: {
            toString() {
              return area.name;
            },
          },
        };
      })
    );
  }

  onMapZoomChanged() {
    this.gmPolylines.forEach((polyline) => {
      polyline.strokeWeight = this.getStrokeWeight();
    });
    this.gmPolygons.forEach((polygon) => {
      polygon.strokeWeight = this.getStrokeWeight();
    });
    this._cd.markForCheck();
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
          strokeWeight: this.getStrokeWeight(),
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
    this.customTooltip = `${path.data}`;
  }

  onPathMouseout(_: MapPolyline, path: GMPolyline) {
    path.strokeColor = '#FF0080';
    this.customTooltip = '';
  }

  onAreaMouseover(_: MapPolygon, area: GMPolygon) {
    area.strokeWeight = this.getStrokeWeight() + 2;
    this.customTooltip = `${area.data}`;
  }

  onAreaMouseout(_: MapPolygon, area: GMPolygon) {
    area.strokeWeight = this.getStrokeWeight();
    this.customTooltip = '';
  }

  getStrokeWeight() {
    return DEFAULT_STROKE_WEIGHT + Math.trunc((this.map.getZoom() ?? 0) / 2);
  }
}

function xyToLatLng(x: number, y: number) {
  return new google.maps.LatLng(y / SCALE_MUL, x / SCALE_MUL);
}

function latLngToXY(latLng: google.maps.LatLngLiteral) {
  return { y: latLng.lat * SCALE_MUL, x: latLng.lng * SCALE_MUL };
}

function createMarkerIcon(width: number, height: number, icon: string) {
  const img = document.createElement('img');
  img.src = mapIconUri + icon;
  img.width = width;
  img.height = height;
  img.style.transform = 'translateY(50%)';
  return img;
}

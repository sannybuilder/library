import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import RRR from './rrr.json';
import Areas from './areas.json';
import Blips from './blips.json';
import { Coordinates, MarkerObject, MProjection } from './classes';
import { MapMarker, MapInfoWindow, MapPolyline } from '@angular/google-maps';
import { CustomMarker, CustomPath, CustomArea, RRRPath } from './model';

declare var google: any;

var _MAP_currentMarker: any;
var _MAP_markerStore: any = [];
var map: google.maps.Map;
var _CDN_url = 'https://cdn.sannybuilder.com/maps/sa';
var _MAP_iconURL = '/assets/sa/maps/icons/';

@Component({
  selector: 'scl-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  standalone: false,
})
export class MapPageComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  BlipCategories = [
    {
      id: 1,
      name: 'Collectibles',
      subcategory: [
        {
          id: 1,
          name: 'Spray Tags',
          icon: 'spray_tag.png',
          positions: Blips.sprayTags,
          visible: false,
        },
        {
          id: 2,
          name: 'Oysters',
          icon: 'oyster.png',
          positions: Blips.oysters,
          visible: false,
        },
        {
          id: 3,
          name: 'Photo Opportunities',
          icon: 'photo_op.png',
          positions: Blips.photoOps,
          visible: false,
        },
        {
          id: 4,
          name: 'Horseshoes',
          icon: 'horseshoe.png',
          positions: Blips.horseshoes,
          visible: false,
        },
      ],
    },
  ];
  _CDN_url = _CDN_url;
  _MAP_iconURL = _MAP_iconURL;

  isSidebarOpen = true;
  activeTab = 1;
  markers: CustomMarker[] = [];
  paths: CustomPath[] = [];
  areas: CustomArea[] = [];

  areWantedZonesEnabled = false;
  arePreRecordedPathsEnabled = false;
  tooltip: string;

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
    private _http: HttpClient
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
    map = _map;
    map.setOptions({ center: convertToMapGMAP(1500, 0) });
    this.globalInit(map);
  }

  globalInit(map: google.maps.Map) {
    const mapSatellite = new google.maps.ImageMapType({
      getTileUrl: function (coord: { x: number; y: number }, zoom: number) {
        const normCoord = getNormalizedCoord(coord, zoom);
        if (!normCoord) return null;
        return `${_CDN_url}/satellite/map_${zoom}_${normCoord.x}_${normCoord.y}.jpg`;
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

    createMarker(
      false,
      true,
      new MarkerObject(
        '@DEBUG@@Locator',
        new Coordinates(0, 0, 0),
        {
          icon: 'debug.png',
          size: new google.maps.Size(23, 32),
          anchor: new google.maps.Point(11.5, 32),
        },
        '',
        ''
      ),
      ''
    );
  }

  openInfoWindow(marker: MapMarker, { data, icon }: CustomMarker) {
    const infoContent = `<div class="p-3 info-box"><div class="info-header-box d-flex align-items-center"><img src="${icon.url}" /><h5>${data.name}</h5></div><div><strong>Position (X,Y,Z):</strong> ${data.x}, ${data.y}, ${data.z}</div></div>`;
    this.infoWindow.open(marker, true, infoContent);
  }

  openInfoWindowAt(event: { latLng: google.maps.LatLng }, content: string) {
    this.infoWindow.position = event.latLng;
    this.infoWindow.open(
      undefined,
      true,
      `<div class="p-3 info-box">${content}</div>`
    );
  }

  toggleBlips(
    blipCategory: (typeof this.BlipCategories)[number]['subcategory'][0]
  ) {
    blipCategory.visible = !blipCategory.visible;
    this.markers = this.markers.filter(
      (m) => !m.id.includes(blipCategory.name)
    );
    if (!blipCategory.visible) {
      return;
    }
    this.markers.push(
      ...blipCategory.positions.map(
        ({ x, y, z }: { x: number; y: number; z: number }, i) => {
          const id = blipCategory.name + ' #' + i;
          return {
            position: convertToMapGMAP(x, y),
            icon: {
              url: _MAP_iconURL + blipCategory.icon,
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
    this.areas = [];

    if (!this.areWantedZonesEnabled) {
      return;
    }

    this.areas = [
      {
        id: 'LV Restricted Area',
        vertices: Areas.lvRestrictedArea.map(([x, y]) =>
          convertToMapGMAP(x, y)
        ),
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        strokeColor: '#CC0000',
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
        vertices: Areas.sfRestrictedArea.map(([x, y]) =>
          convertToMapGMAP(x, y)
        ),
        fillColor: '#FFFF00',
        fillOpacity: 0.35,
        strokeColor: '#CC0000',
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

    this.paths = this.paths.filter((p) => !p.id.includes('RRR'));
    if (!this.arePreRecordedPathsEnabled) {
      return;
    }

    this.paths = (RRR as RRRPath[]).map((rrr, i) => {
      return {
        id: 'RRR #' + i,
        vertices: rrr.path.map(({ x, y }) => convertToMapGMAP(x, y)),
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

  onPathMouseover(_: MapPolyline, path: CustomPath) {
    path.strokeColor = '#FFFF80';
    this.tooltip = `${path.data}`;
  }

  onPathMouseout(_: MapPolyline, path: CustomPath) {
    path.strokeColor = '#FF0080';
    this.tooltip = `${path.data}`;
  }
}

function createMarker(animated: any, draggable: any, obj: any, title: any) {
  if (title != '') {
    var splitTitle = title.split(' - ');
    if (splitTitle.length >= 4) {
      var posSplit = splitTitle[1].split(' ');
      var x1 = posSplit[0].replace('X{', '');
      var xResult = x1.replace('}', '');
      var y1 = posSplit[1].replace('Y{', '');
      var yResult = y1.replace('}', '');
      var z1 = posSplit[2].replace('Z{', '');
      var zResult = z1.replace('}', '');
      obj.position = new Coordinates(xResult, yResult, zResult);
      var noSpaceHash = splitTitle[2].replace(/\s+/g, '');
      var hash = noSpaceHash.replace('Hash:', '');
      obj.hash = hash;
      var noSpaceModel = splitTitle[3].replace(/\s+/g, '');
      var model = noSpaceModel.replace('ModelName:', '');
      obj.modelname = model;
    }
  }
  var name = obj.reference;
  obj.position = stringCoordToFloat(obj.position);
  var coord = convertToMapGMAP(obj.position.x, obj.position.y);
  var dcoord = convertToMap(obj.position.x, obj.position.y);
  var locationType = obj.type;
  function doPopupContent(
    x: any,
    y: any,
    z: any,
    title: any,
    name: any,
    model: any
  ) {
    var html =
      '<div class="row info-body-row"><strong>Position (X,Y,Z):</strong> ' +
      parseFloat(x.toFixed(3)) +
      ', ' +
      parseFloat(y.toFixed(3)) +
      ', ' +
      parseFloat(z.toFixed(3)) +
      '</div>';
    var latlng = convertToMap(x, y);
    html +=
      '<div class="row info-body-row"><strong>Position (Lat,Lng):</strong> ' +
      parseFloat(latlng.lat.toFixed(3)) +
      ', ' +
      parseFloat(latlng.lng.toFixed(3)) +
      '</div>';
    if (name != '')
      html +=
        '<div class="row info-body-row"><strong>Name:</strong> ' +
        name +
        '</div>';
    if (model != '')
      html +=
        '<div class="row info-body-row"><strong>Model:</strong> ' +
        model +
        '</div>';
    return (
      '<div class="info-window"><div class="info-header-box"><div class="info-icon"></div><div class="info-header">' +
      title +
      '</div></div><div class="clear"></div><div id=info-body>' +
      html +
      '</div></div>'
    );
  }
  var infoContent = doPopupContent(
    obj.position.x,
    obj.position.y,
    obj.position.z,
    name,
    obj.hash,
    obj.modelname
  );
  var infoBox = new google.maps.InfoWindow({
    content: infoContent,
  });
  var image = {
    url: _MAP_iconURL + locationType.icon,
    size: locationType.size,
    origin: new google.maps.Point(0, 0),
    anchor: locationType.anchor,
  };
  var marker = new google.maps.Marker({
    id: _MAP_markerStore.length,
    type: locationType.name,
    position: coord,
    icon: image,
    map: map,
    popup: infoBox,
    popupContent: infoContent,
    object: obj,
    draggable: draggable ? true : false,
    animation: animated ? google.maps.Animation.DROP : 0,
  });
  google.maps.event.addListener(marker, 'click', function () {
    if (_MAP_currentMarker) _MAP_currentMarker.popup.close();
    _MAP_currentMarker = marker;
    var pos = convertToGame(marker.position.lat(), marker.position.lng());
    marker.popup.setContent(
      doPopupContent(
        pos.x,
        pos.y,
        obj.position.z,
        marker.object.reference,
        marker.object.hash,
        marker.object.modelname
      )
    );
    // @ts-expect-error
    marker.popup.open(map, this);
  });
  google.maps.event.addListener(marker, 'drag', function () {
    //if (_MAP_currentMarker) _MAP_currentMarker.popup.close();
    _MAP_currentMarker = marker;
    var pos = convertToGame(marker.position.lat(), marker.position.lng());
    marker.popup.setContent(
      doPopupContent(
        pos.x,
        pos.y,
        obj.position.z,
        marker.object.reference,
        marker.object.hash,
        marker.object.modelname
      )
    );
    if (marker.object.reference == '@DEBUG@@Locator') {
      $('#locator_x').val(pos.x);
      $('#locator_y').val(pos.y);
    }
  });
  google.maps.event.addListener(marker, 'dragend', function () {
    if (_MAP_currentMarker) _MAP_currentMarker.popup.close();
    _MAP_currentMarker = marker;
    var pos = convertToGame(marker.position.lat(), marker.position.lng());
    marker.popup.setContent(
      doPopupContent(
        pos.x,
        pos.y,
        obj.position.z,
        marker.object.reference,
        marker.object.hash,
        marker.object.modelname
      )
    );
    // @ts-expect-error
    marker.popup.open(map, this);
    if (marker.object.reference == '@DEBUG@@Locator') {
      $('#locator_x').val(pos.x);
      $('#locator_y').val(pos.y);
    }
  });
  if (name == '@DEBUG@@Locator') {
    $('#marker-list').append(
      '<div id="marker_' +
        marker.id +
        '" data-id="' +
        marker.id +
        '" class="marker-item"><div class="marker-desc"><span class="marker_name">@Locator</span></div><div class="marker-options"><a href="#" class="marker_view" title="View"><img src="' +
        _CDN_url +
        '/images/icons/view.png" alt="View" height="16" width="16" /></a> / <a href="#" class="marker_share" title="Share Marker"><img src="' +
        _CDN_url +
        '/images/icons/share.png" alt="Share Marker" height="16" width="16" /></a></div></div><div class="clear"></div>'
    );
  } else {
    $('#marker-list').append(
      '<div id="marker_' +
        marker.id +
        '" data-id="' +
        marker.id +
        '" class="marker-item"><div class="marker-desc"><span class="marker_name">' +
        name +
        '</span></div><div class="marker-options"><a href="#" class="marker_view" title="View"><img src="' +
        _CDN_url +
        '/images/icons/view.png" alt="View" height="16" width="16" /></a> / <a href="#" class="marker_share" title="Share Marker"><img src="' +
        _CDN_url +
        '/images/icons/share.png" alt="Share Marker" height="16" width="16" /></a> / <a href="#" class="marker_delete" title="Delete"><img src="' +
        _CDN_url +
        '/images/icons/delete.png" alt="Delete" height="16" width="16" /></a></div></div><div class="clear"></div>'
    );
  }
  _MAP_markerStore.push(marker);
  // initUserControls(true);
}

function convertToGame(lat: any, lng: any) {
  return { x: lat * 128, y: lng * 128 };
}
function convertToMap(x: any, y: any) {
  return { lat: y / 128, lng: x / 128 };
}
function convertToMapGMAP(x: any, y: any) {
  return new google.maps.LatLng(y / 128, x / 128);
}
function stringCoordToFloat(coord: any) {
  return {
    x: parseFloat(coord.x),
    y: parseFloat(coord.y),
    z: parseFloat(coord.z),
  };
}

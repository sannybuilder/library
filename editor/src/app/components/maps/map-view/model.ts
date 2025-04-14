export interface XYZ {
  x: number;
  y: number;
  z: number;
}

export interface GMPolyline {
  id: string;
  vertices: google.maps.LatLng[];
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
  data: unknown;
}

export interface GMPolygon {
  id: string;
  vertices: google.maps.LatLng[];
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
  fillColor: string;
  fillOpacity: number;
  data: unknown;
}

export interface GMMarker {
  id: string;
  position: google.maps.LatLng;
  icon: any;
  data: { x: number; y: number; z: number; name: string };
}

export interface Category<T> {
  name: string;
  subcategory: Subcategory<T>[];
}

export interface Subcategory<T> {
  name: string;
  icon?: string;
  visible: boolean;
  items: T[];
}

export interface PathData {
  name: string;
  path: Array<{ x: number; y: number }>;
  description: string;
}

export interface AreaData {
  name: string;
  color: string;
  vertices: Array<[number, number]>;
}

export interface BlipData {
  sprayTags: XYZ[];
  oysters: XYZ[];
  photoOps: XYZ[];
  horseshoes: XYZ[];
}

export interface MapManifest {
  zones: MapSource[];
  paths: MapSource[];
  locations: MapSource[];
}

export interface MapSource {
  name: string;
  path: string;
  icon?: string;
}

export const cdnUri = 'https://cdn.sannybuilder.com/maps/sa';
export const mapIconUri = '/assets/sa/maps/icons/';

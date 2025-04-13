export interface XYZ {
  x: number;
  y: number;
  z: number;
}

export interface GMPath {
  id: string;
  vertices: google.maps.LatLng[];
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
  data: unknown;
}

export interface GMArea {
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

export interface BlipCategory {
  id: number;
  name: string;
  subcategory: BlipSubcategory[];
}

export interface BlipSubcategory {
  id: number;
  name: string;
  icon: string;
  visible: boolean;
  positions: XYZ[];
}

export interface RRRData {
  name: string;
  path: Array<{ x: number; y: number }>;
  description: string;
}

export interface AreaData {
  lvRestrictedArea: Array<[number, number]>;
  sfRestrictedArea: Array<[number, number]>;
}

export interface BlipData {
  sprayTags: XYZ[];
  oysters: XYZ[];
  photoOps: XYZ[];
  horseshoes: XYZ[];
}

export const cdnUri = 'https://cdn.sannybuilder.com/maps/sa';
export const mapIconUri = '/assets/sa/maps/icons/';

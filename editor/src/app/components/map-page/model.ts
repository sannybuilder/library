
export interface RRRPath {
    name: string;
    path: Array<{ x: number; y: number }>;
    description: string;
  }
  
  export  interface CustomPath {
    id: string;
    vertices: google.maps.LatLng[];
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    data: unknown;
  }
  
  export interface CustomArea {
    id: string;
    vertices: google.maps.LatLng[];
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    fillColor: string;
    fillOpacity: number;
    data: unknown;
  }
  
  export interface CustomMarker {
    id: string;
    position: google.maps.LatLng;
    icon: any;
    data: { x: number; y: number; z: number; name: string };
  }
  
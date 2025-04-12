export class MProjection {
  fromLatLngToPoint(latlng: any) {
    const x = 187.5 + 8 * latlng.lng();
    const y = 187.5 + -8 * latlng.lat();
    return new google.maps.Point(x, y);
  }

  fromPointToLatLng(pos: any, b: any) {
    return new google.maps.LatLng((pos.y - 187.5) / -8, (pos.x - 187.5) / 8, b);
  }
}

export class MarkerObject {
  constructor(
    public reference: any,
    public position: any,
    public type: any,
    public hash: any,
    public modelname: any
  ) {}
}

export class Coordinates {
  constructor(public x: any, public y: any, public z: any) {}
}

export class MapArea {
  active = false;
  constructor(public name: any, public paths: any, public type: any) {}
}

// export class MapMarker {
//   constructor(public name: any, public pos: any, public blip: any) {}
// }
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

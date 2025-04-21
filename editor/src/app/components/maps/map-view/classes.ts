export class MProjection {
  constructor(private center: number, private scale: number) {}

  fromLatLngToPoint(latlng: any) {
    const x = this.center + this.scale * latlng.lng();
    const y = this.center + -this.scale * latlng.lat();
    return new google.maps.Point(x, y);
  }

  fromPointToLatLng(pos: any, b: any) {
    return new google.maps.LatLng(
      (pos.y - this.center) / -this.scale,
      (pos.x - this.center) / this.scale,
      b
    );
  }
}

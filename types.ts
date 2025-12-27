export interface AirportFeature {
  type: 'Feature';
  properties: {
    name: string;
    abbrev: string;
    scalerank: number;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

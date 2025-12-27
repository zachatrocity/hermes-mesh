import { ArcLayer } from 'deck.gl';

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

interface CreateArcsLayerOptions {
  sourceCoordinates: [number, number];
}

export function createArcsLayer({ sourceCoordinates }: CreateArcsLayerOptions) {
  return new ArcLayer({
    id: 'arcs',
    data: AIR_PORTS,
    dataTransform: (d: any) => d.features.filter((f: any) => f.properties.scalerank < 4),
    // Styles
    getSourcePosition: (f: any) => sourceCoordinates,
    getTargetPosition: (f: any) => f.geometry.coordinates,
    getSourceColor: [0, 128, 200],
    getTargetColor: [200, 0, 80],
    getWidth: 1
  });
}

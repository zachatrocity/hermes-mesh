import { GeoJsonLayer } from 'deck.gl';

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

interface CreateAirportsLayerOptions {
  onClick?: (info: any) => void;
}

export function createAirportsLayer({ onClick }: CreateAirportsLayerOptions = {}) {
  return new GeoJsonLayer({
    id: 'airports',
    data: AIR_PORTS,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 2000,
    getPointRadius: (f: any) => 11 - f.properties.scalerank,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick: onClick
    // beforeId: 'watername_ocean' // In interleaved mode, render the layer under map labels
  });
}

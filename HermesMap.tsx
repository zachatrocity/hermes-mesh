import { useState, useCallback } from 'react';
import { Layer, Map, Source, TerrainControl, useControl } from 'react-map-gl/maplibre';
import type { SkySpecification, TerrainSpecification, ViewStateChangeEvent } from 'react-map-gl/maplibre';
import { MapboxOverlay as DeckOverlay, MapboxOverlayProps } from '@deck.gl/mapbox';
import 'maplibre-gl/dist/maplibre-gl.css';

import { MapPopup } from './components/MapPopup';
import { createAirportsLayer } from './layers/AirportsLayer';
import { createArcsLayer } from './layers/ArcsLayer';
import { AirportFeature } from './types';
import { getInitialCoordinates, saveCoordinatesToStorage } from './utils/coordinates';

const DEFAULT_COORDINATES = {
  longitude: -0.4531566,
  latitude: 51.4709959
};

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl(() => new DeckOverlay(props));
  overlay.setProps(props);
  return null;
}

export function HermesMap() {
  // Get initial coordinates from query params or local storage
  const initialCoords = getInitialCoordinates(DEFAULT_COORDINATES);

  const [selected, setSelected] = useState<AirportFeature | null>(null);

  const initialViewState = {
    longitude: initialCoords.longitude,
    latitude: initialCoords.latitude,
    zoom: 4,
    bearing: 0,
    pitch: 30
  };

  // Handle map movement to save position
  const handleMove = useCallback((evt: ViewStateChangeEvent) => {
    const { longitude, latitude } = evt.viewState;
    saveCoordinatesToStorage({ longitude, latitude });
  }, []);

  const layers = [
    createAirportsLayer({
      onClick: (info: any) => setSelected(info.object)
    }),
    createArcsLayer({
      sourceCoordinates: [initialCoords.longitude, initialCoords.latitude]
    })
  ];

  const sky: SkySpecification = {
    'sky-color': '#80ccff',
    'sky-horizon-blend': 0.5,
    'horizon-color': '#ccddff',
    'horizon-fog-blend': 0.5,
    'fog-color': '#fcf0dd',
    'fog-ground-blend': 0.2
  };

  const terrain: TerrainSpecification = { source: 'terrain-dem', exaggeration: 1.5 };

  return (
    <Map
      initialViewState={initialViewState}
      // mapStyle={MAP_STYLE}
      mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
      style={{ width: '100vw', height: '100vh' }}
      onMove={handleMove}
      maxPitch={85}
      sky={sky}
      terrain={terrain}
    >
      {selected && (
        <MapPopup
          longitude={selected.geometry.coordinates[0]}
          latitude={selected.geometry.coordinates[1]}
          onClose={() => setSelected(null)}
        >
          {selected.properties.name} ({selected.properties.abbrev})
        </MapPopup>
      )}

      <Source
        id="terrain-dem"
        type="raster-dem"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        tileSize={256}
      />
      <Source
        id="hillshade-dem"
        type="raster-dem"
        url="https://demotiles.maplibre.org/terrain-tiles/tiles.json"
        tileSize={256}
      >
        <Layer
          type="hillshade"
          layout={{ visibility: 'visible' }}
          paint={{ 'hillshade-shadow-color': '#473B24' }}
        />

        <TerrainControl {...terrain} position="top-left" />
      </Source>
      <DeckGLOverlay layers={layers} /* interleaved*/ />
    </Map>
  );
}

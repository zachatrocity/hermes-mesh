import { useState, useCallback } from 'react';
import { Map, NavigationControl, useControl } from 'react-map-gl/maplibre';
import type { ViewStateChangeEvent } from 'react-map-gl/maplibre';
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

  return (
    <Map 
      initialViewState={initialViewState}
      mapStyle={MAP_STYLE}
      style={{ width: '100vw', height: '100vh' }}
      onMove={handleMove}
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
      <DeckGLOverlay layers={layers} /* interleaved*/ />
      <NavigationControl position="top-left" />
    </Map>
  );
}

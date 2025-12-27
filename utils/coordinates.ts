const STORAGE_KEY = 'lastMapPosition';

export interface Coordinates {
  longitude: number;
  latitude: number;
}

/**
 * Get coordinates from URL query params
 * Expected format: ?lng=-0.45&lat=51.47
 */
export function getCoordinatesFromQuery(): Coordinates | null {
  const params = new URLSearchParams(window.location.search);
  const lng = params.get('lng');
  const lat = params.get('lat');

  if (lng && lat) {
    const longitude = parseFloat(lng);
    const latitude = parseFloat(lat);

    if (!isNaN(longitude) && !isNaN(latitude)) {
      return { longitude, latitude };
    }
  }

  return null;
}

/**
 * Save coordinates to local storage
 */
export function saveCoordinatesToStorage(coords: Coordinates): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coords));
  } catch (error) {
    console.warn('Failed to save coordinates to local storage:', error);
  }
}

/**
 * Load coordinates from local storage
 */
export function loadCoordinatesFromStorage(): Coordinates | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const coords = JSON.parse(stored);
      if (coords.longitude !== undefined && coords.latitude !== undefined) {
        return coords;
      }
    }
  } catch (error) {
    console.warn('Failed to load coordinates from local storage:', error);
  }
  return null;
}

/**
 * Get coordinates from query params, falling back to local storage, then to default
 */
export function getInitialCoordinates(defaultCoords: Coordinates): Coordinates {
  return (
    getCoordinatesFromQuery() ||
    loadCoordinatesFromStorage() ||
    defaultCoords
  );
}

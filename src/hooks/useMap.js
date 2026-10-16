// src/hooks/useMap.js
import { useState, useCallback, useRef } from 'react';

export const useMap = () => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    mapRef.current = mapInstance;
  }, []);

  const panToLocation = useCallback((lat, lng, zoom = 15) => {
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(zoom);
    }
  }, []);

  const fitBoundsToLocations = useCallback((locations) => {
    if (!mapRef.current || !locations?.length) return;
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(loc => {
      if (loc.lat && loc.lng) {
        bounds.extend({ lat: loc.lat, lng: loc.lng });
      }
    });
    mapRef.current.fitBounds(bounds, { padding: 60 });
  }, []);

  const selectMarker = useCallback((location) => {
    setSelectedMarker(location);
    if (location?.lat && location?.lng) {
      panToLocation(location.lat, location.lng, 14);
    }
  }, [panToLocation]);

  const clearSelectedMarker = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  return {
    map,
    selectedMarker,
    onMapLoad,
    panToLocation,
    fitBoundsToLocations,
    selectMarker,
    clearSelectedMarker,
  };
};

export default useMap;